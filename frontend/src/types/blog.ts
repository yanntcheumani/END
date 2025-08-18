export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  featured: boolean;
  image?: string;
  video: string;
  tags: Tag[];
  author: {
    id: number;
    username: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  published_at?: string;
  read_time: number;
}

export interface Tag {
  id: number;
  name: string;
  uuid: string;
  description?: string;
  color?: string;
  posts_count: number;
}

export interface BlogPostCreate {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  image?: string;
  video: string;
  tags: number[];
}

export interface BlogPostUpdate extends Partial<BlogPostCreate> {
  id: number;
}

export interface BlogFilters {
  tag?: string;
  author?: string;
  search?: string;
  featured?: boolean;
  published?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}