export const getArticleCategory = (article: any): string => {
  return article.category || (article.tags?.[0]?.name) || 'Non catégorisé';
};

export const getArticleAuthor = (article: any): string => {
  return typeof article.author === 'string' ? article.author : article.author?.username || 'Anonyme';
};

export const getArticleDate = (article: any): string => {
  return article.date || (article.created_at ? new Date(article.created_at).toLocaleDateString() : '');
};

export const getArticleReadTime = (article: any): string => {
  return article.readTime || (article.read_time ? `${article.read_time} min` : '');
};