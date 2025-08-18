export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    ME: `${API_BASE_URL}/api/v1/auth/me`
  },
  BLOG: {
    POSTS: `${API_BASE_URL}/api/v1/blog/`,
  },
  TAGS: {
    POSTS: `${API_BASE_URL}/api/v1/tag/`,
    GET: `${API_BASE_URL}/api/v1/tag/`,
  }
};