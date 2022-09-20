import { GetStaticProps, NextPage } from 'next';

import { ContentLayout, MainLayout } from '@/components/Layout';
import { ArticleList, TechArticle } from '@/features/tech';
import { supabase } from '@/lib';

interface TechArticleListScreenProps {
  articles: Array<TechArticle>;
}

const TechArticleListScreen: NextPage<TechArticleListScreenProps> = ({ articles }) => {
  return (
    <MainLayout
      path='/tech'
      title='TechBlog'
    >
      <ContentLayout className='my-8'>
        <ArticleList articles={articles} />
      </ContentLayout>
    </MainLayout>
  );
};

// noinspection JSUnusedGlobalSymbols
export default TechArticleListScreen;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<TechArticleListScreenProps> = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: articleEntities } = await supabase
    .from('tech_full_articles')
    .select('id, published_at, title, content, url, width, height')
    .is('deleted_at', null)
    .lt('published_at', new Date().toISOString());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
  const articleIds = articleEntities?.map((entity) => `${entity.id}`) ?? [];

  const { data: tagLinkEntities } = await supabase
    .from('tech_article_tag_links')
    .select('tech_article_id, tech_tag_id, tech_tags ( name )')
    .in('tech_article_id', articleIds);

  /* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call */
  const articles =
    articleEntities?.map<TechArticle>((entity) => {
      const articleId = `${entity.id}`;
      return {
        id: articleId,
        publishedAt: `${entity.published_at}`,
        title: `${entity.title}`,
        content: `${entity.content}`,
        eyecatch: entity.url
          ? {
              url: `${entity.url}`,
              height: Number(entity.height),
              width: Number(entity.width),
            }
          : null,
        tags:
          tagLinkEntities
            ?.filter((entity) => `${entity.tech_article_id}` === articleId)
            ?.map((entity) => {
              return {
                id: `${entity.tech_tag_id}`,
                name: `${entity.tech_tags.name}`,
              };
            }) ?? null,
      };
    }) ?? [];
  /* eslint-enable */

  return {
    props: {
      articles,
    },
    revalidate: 10,
  };
};
