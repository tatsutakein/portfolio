import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/future/image';
import markdownToHtml from 'zenn-markdown-html';

import { ContentLayout, MainLayout } from '@/components/Layout';
import { TechArticle } from '@/features/tech';
import { formatDateTime, supabase } from '@/lib';

interface TechArticleScreenProps {
  article: TechArticle;
}

const TechArticleListScreen: NextPage<TechArticleScreenProps> = ({ article }) => {
  return (
    <MainLayout
      path={`/tech/${article.id}`}
      title={article.title}
    >
      <ContentLayout className='my-8'>
        {article.eyecatch && (
          <Image
            src={article.eyecatch.url}
            alt=''
            width={article.eyecatch.width}
            height={article.eyecatch.height}
            className='object-cover'
          />
        )}

        <h1 className=''>{article.title}</h1>
        <p className=''>公開日時: {formatDateTime(article.publishedAt)}</p>
        <div
          className='[&_a]:text-purple-500 [&_pre]:my-2 [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-zinc-800 [&_pre]:p-4 [&_pre]:text-zinc-50'
          dangerouslySetInnerHTML={{
            __html: `${markdownToHtml(article.content)}`,
          }}
        />
      </ContentLayout>
    </MainLayout>
  );
};

// noinspection JSUnusedGlobalSymbols
export default TechArticleListScreen;

// 静的生成のためのパスを指定します
// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: articleEntities } = await supabase
    .from('tech_articles')
    .select('id')
    .is('deleted_at', null)
    .lt('published_at', new Date().toISOString());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
  const paths = articleEntities?.map((entity) => `/tech/${entity.id}`) ?? [];

  return { paths, fallback: 'blocking' };
};

// データをテンプレートに受け渡す部分の処理を記述します
// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<TechArticleScreenProps> = async (context) => {
  const id = context.params?.id?.toString();

  if (id === undefined) {
    return {
      notFound: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: articleEntity } = await supabase
    .from('tech_full_articles')
    .select('id, published_at, title, content, url, width, height')
    .is('deleted_at', null)
    .lt('published_at', new Date().toISOString())
    .eq('id', id)
    .single();

  if (articleEntity === null) {
    return {
      notFound: true,
    };
  }

  const { data: tagLinkEntities } = await supabase
    .from('tech_article_tag_links')
    .select('tech_tag_id, tech_tags ( name )')
    .eq('tech_article_id', id);

  /* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call */
  const article: TechArticle = {
    id: `${articleEntity.id}`,
    publishedAt: `${articleEntity.published_at}`,
    title: `${articleEntity.title}`,
    content: `${articleEntity.content}`,
    eyecatch: articleEntity.url
      ? {
          url: `${articleEntity.url}`,
          height: Number(articleEntity.height),
          width: Number(articleEntity.width),
        }
      : null,
    tags:
      tagLinkEntities?.map((entity) => {
        return {
          id: `${entity.tech_tag_id}`,
          name: `${entity.name}`,
        };
      }) ?? null,
  };
  /* eslint-enable */

  return {
    props: {
      article,
    },
    revalidate: 10,
  };
};
