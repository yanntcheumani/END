import { useState, useEffect } from 'react';
import { BlogPost, Tag, BlogFilters, PaginatedResponse, BlogPostCreate, BlogPostUpdate } from '@/types/blog';
import { useAuth } from './useAuth';
import { API_ENDPOINTS } from '@/config/api';

export const useBlog = () => {
  const { token } = useAuth();
  
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  // Blog posts
  const fetchBlogPosts = async (filters: BlogFilters = {}): Promise<PaginatedResponse<BlogPost>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`${API_ENDPOINTS.BLOG.POSTS}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    return response.json();
  };

  const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
    const response = await fetch(`${API_ENDPOINTS.BLOG.POSTS}/${slug}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }

    return response.json();
  };

  const createBlogPost = async (post: BlogPostCreate): Promise<BlogPost> => {
    const response = await fetch(API_ENDPOINTS.BLOG.POSTS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error('Failed to create blog post');
    }

    return response.json();
  };

  const updateBlogPost = async (id: number, post: Partial<BlogPostCreate>): Promise<BlogPost> => {
    const response = await fetch(`${API_ENDPOINTS.BLOG.POSTS}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error('Failed to update blog post');
    }

    return response.json();
  };

  const deleteBlogPost = async (id: number): Promise<void> => {
    const response = await fetch(`${API_ENDPOINTS.BLOG.POSTS}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }
  };

  // Tags
  const fetchTags = async (): Promise<Tag[]> => {
    const response = await fetch(API_ENDPOINTS.TAGS.GET, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }

    return response.json();
  };

  const createTag = async (tag: { name: string; description?: string; color?: string }): Promise<Tag> => {
    const response = await fetch(API_ENDPOINTS.TAGS.POSTS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(tag),
    });

    if (!response.ok) {
      throw new Error('Failed to create tag');
    }

    return response.json();
  };

  return {
    fetchBlogPosts,
    fetchBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    fetchTags,
    createTag,
  };
};

export const useBlogPosts = (filters: BlogFilters = {}) => {
  const [posts, setPosts] = useState<PaginatedResponse<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchBlogPosts } = useBlog();

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBlogPosts(filters);
      setPosts(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [JSON.stringify(filters)]);

  return { posts, loading, error, refetch: loadPosts };
};

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchTags } = useBlog();

  const loadTags = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTags();
      setTags(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return { tags, loading, error, refetch: loadTags };
};