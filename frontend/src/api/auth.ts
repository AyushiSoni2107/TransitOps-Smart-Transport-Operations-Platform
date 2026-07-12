import { AuthUser, Role } from '../types';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface AuthResponse {
  data: {
    user: AuthUser;
    token: string;
  };
}

interface ApiError {
  message?: string;
  errors?: string[];
}

async function requestAuth(path: string, payload: Record<string, unknown>) {
  const urls = [`/api/auth/${path}`, `${BACKEND_URL}/api/auth/${path}`];

  let lastError: Error | null = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body = (await response.json().catch(() => ({}))) as AuthResponse | ApiError;

      if (!response.ok) {
        const error = body as ApiError;
        throw new Error(error.errors?.[0] || error.message || 'Authentication failed');
      }

      return body as AuthResponse;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Authentication failed');
    }
  }

  throw lastError ?? new Error('Authentication failed');
}

export async function loginUser(email: string, password: string) {
  return requestAuth('login', { email, password });
}

export async function signupUser(
  name: string,
  company: string,
  email: string,
  password: string,
  role: Role
) {
  return requestAuth('signup', { name, company, email, password, role });
}

export function saveSession(user: AuthUser, token: string) {
  localStorage.setItem('transitops_user', JSON.stringify(user));
  localStorage.setItem('transitops_token', token);
}

export function getSavedUser() {
  const saved = localStorage.getItem('transitops_user');
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as AuthUser;
  } catch {
    localStorage.removeItem('transitops_user');
    localStorage.removeItem('transitops_token');
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem('transitops_user');
  localStorage.removeItem('transitops_token');
}