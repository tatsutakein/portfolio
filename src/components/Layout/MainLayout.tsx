import NextHeadSeo from 'next-head-seo';

import { Footer, Header } from '@/components/Elements';

const APP_NAME = 'ripomoea';
const APP_ROOT_URL = 'https://ripomoea.com';
const APP_DEFAULT_DESCRIPTION = 'ripomoea のポートフォリオサイトです。';
const APP_DEFAULT_OG_IMAGE_PATH = '/profile-256.webp';

type LayoutProps = {
  path: string;
  title: string;
  description?: string;
  ogImagePath?: string;
  noindex?: boolean;
  noTitleTemplate?: boolean;
  isTopPage?: boolean;
  children: React.ReactNode;
};

export const MainLayout = ({
  path,
  title,
  description = APP_DEFAULT_DESCRIPTION,
  ogImagePath = APP_DEFAULT_OG_IMAGE_PATH,
  noindex,
  noTitleTemplate,
  isTopPage,
  children,
}: LayoutProps): JSX.Element => {
  const pageUrl = APP_ROOT_URL + path;
  const ogImageUrl = APP_ROOT_URL + ogImagePath;

  return (
    <>
      <NextHeadSeo
        title={noTitleTemplate ? title : `${title} - ${APP_NAME}`}
        canonical={pageUrl}
        description={description}
        robots={noindex ? 'noindex, nofollow' : undefined}
        og={{
          title,
          description,
          url: pageUrl,
          image: ogImageUrl,
          type: isTopPage ? 'website' : 'article',
          siteName: APP_NAME,
        }}
        twitter={{
          card: 'summary_large_image',
        }}
      />

      <div className='flex min-h-screen flex-col'>
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </div>
    </>
  );
};
