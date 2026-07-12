import { Router } from 'express';
import { asyncHandler } from './asyncHandler.js';
import { cleanMongoId } from './cleanMongo.js';
import { generateBusinessId } from './idGenerator.js';

function buildRegex(value) {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

export function createCrudRouter(Model, options = {}) {
  const router = Router();
  const {
    idPrefix,
    idWidth = 3,
    searchFields = [],
    filterFields = [],
    defaultSort = { createdAt: -1 }
  } = options;

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const query = {};
      const { search, limit = 100, page = 1 } = req.query;

      if (search && searchFields.length) {
        const regex = buildRegex(String(search));
        query.$or = searchFields.map((field) => ({ [field]: regex }));
      }

      for (const field of filterFields) {
        if (req.query[field] && req.query[field] !== 'All') {
          query[field] = req.query[field];
        }
      }

      const safeLimit = Math.min(Number(limit) || 100, 500);
      const safePage = Math.max(Number(page) || 1, 1);
      const skip = (safePage - 1) * safeLimit;

      const [items, total] = await Promise.all([
        Model.find(query).sort(defaultSort).skip(skip).limit(safeLimit).lean(),
        Model.countDocuments(query)
      ]);

      res.json({
        data: cleanMongoId(items),
        pagination: {
          total,
          page: safePage,
          limit: safeLimit,
          pages: Math.ceil(total / safeLimit)
        }
      });
    })
  );

  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const item = await Model.findOne({ id: req.params.id }).lean();
      if (!item) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      res.json({ data: cleanMongoId(item) });
    })
  );

  router.post(
    '/',
    asyncHandler(async (req, res) => {
      const payload = { ...req.body };
      if (!payload.id && idPrefix) {
        payload.id = await generateBusinessId(Model, idPrefix, idWidth);
      }

      const item = await Model.create(payload);
      res.status(201).json({ data: item.toObject() });
    })
  );

  router.patch(
    '/:id',
    asyncHandler(async (req, res) => {
      const item = await Model.findOneAndUpdate({ id: req.params.id }, req.body, {
        new: true,
        runValidators: true
      }).lean();

      if (!item) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      res.json({ data: cleanMongoId(item) });
    })
  );

  router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      const item = await Model.findOneAndDelete({ id: req.params.id }).lean();
      if (!item) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      res.status(204).send();
    })
  );

  return router;
}
