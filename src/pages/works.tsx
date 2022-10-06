import { GetStaticProps, NextPage } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';

import { ContentLayout, MainLayout } from '@/components/Layout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WorksScreenProps {}

const WorksScreen: NextPage<WorksScreenProps> = () => {
  return (
    <MainLayout
      path='/works'
      title='Works'
    >
      <ContentLayout className='my-8 leading-loose'>
        <h1>Works</h1>
        <div className='-m-4 flex flex-wrap'>
          <div className='p-4 md:w-1/3'>
            <div className='h-full overflow-hidden rounded-lg border-2 border-gray-200/60'>
              <Image
                className='w-full object-contain object-center p-2 md:h-36 lg:h-48'
                src='/fc-puentet.webp'
                width={720}
                height={400}
                alt='FC プエンテット'
              />
              <div className='p-6'>
                <h1 className='mt-0 mb-3 text-lg font-medium text-gray-900'>FCプエンテット</h1>
                <p className='mb-3 leading-relaxed'>
                  React(Next.js), Tailwind CSS, Framer Motion, Supabase
                  などを利用して作成したサッカーチームサイトです。
                </p>
                <div className='flex flex-wrap items-center'>
                  <Link href='https://fc-puentet.com'>
                    <a
                      target='_blank'
                      className='inline-flex items-center text-blue-500 md:mb-2 lg:mb-0'
                    >
                      リンク先へ遷移する
                      <svg
                        className='ml-2 h-4 w-4'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                      >
                        <path d='M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z' />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </MainLayout>
  );
};

// noinspection JSUnusedGlobalSymbols
export default WorksScreen;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<WorksScreenProps> = () => {
  return {
    props: {},
    revalidate: 10,
  };
};
