import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const scrypt = promisify(scryptCallback);
const memoryUsers = [];

async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = await scrypt(password, salt, 64);
  return { salt, hash: hash.toString('hex') };
}

async function verifyPassword(password, salt, expectedHash) {
  const { hash } = await hashPassword(password, salt);
  const actual = Buffer.from(hash, 'hex');
  const expected = Buffer.from(expectedHash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function checkDatabaseAvailable() {
  return mongoose.connection.readyState === 1;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function buildSafeUser(user) {
  return {
    id: user._id?.toString?.() || user.id,
    name: user.name,
    company: user.company,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (checkDatabaseAvailable()) {
    return User.findOne({ email: normalizedEmail });
  }

  return memoryUsers.find((user) => user.email === normalizedEmail) || null;
}

async function createUserRecord({ name, company, email, role, passwordSalt, passwordHash }) {
  const normalizedEmail = normalizeEmail(email);

  if (checkDatabaseAvailable()) {
    return User.create({
      name,
      company,
      email: normalizedEmail,
      role,
      passwordSalt,
      passwordHash
    });
  }

  const fallbackUser = {
    id: new mongoose.Types.ObjectId().toString(),
    _id: new mongoose.Types.ObjectId(),
    name,
    company,
    email: normalizedEmail,
    role,
    passwordSalt,
    passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
    toSafeObject() {
      return buildSafeUser(this);
    }
  };

  memoryUsers.push(fallbackUser);
  return fallbackUser;
}

router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const { name, company, email, password, role } = req.body;

    if (!name || !company || !email || !password) {
      return res.status(400).json({ message: 'name, company, email, and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }

    const { salt, hash } = await hashPassword(password);
    const user = await createUserRecord({
      name,
      company,
      email,
      role,
      passwordSalt: salt,
      passwordHash: hash
    });

    res.status(201).json({
      data: {
        user: user.toSafeObject(),
        token: randomBytes(32).toString('hex')
      }
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordSalt, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      data: {
        user: user.toSafeObject(),
        token: randomBytes(32).toString('hex')
      }
    });
  })
);

export default router;
