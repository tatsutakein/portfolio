export type TechTag = {
  id: string;
  name: string;
};

export type TechArticle = {
  id: string;
  publishedAt: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  } | null;
  tags: Array<TechTag> | null;
};
