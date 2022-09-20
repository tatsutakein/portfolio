import { NextPage } from 'next';
import Image from 'next/future/image';

import { ContentLayout, MainLayout } from '@/components/Layout';

const Home: NextPage = () => {
  return (
    <MainLayout
      path='/'
      title='ripomoea'
      noTitleTemplate
      isTopPage
    >
      <ContentLayout className='mt-8 flex flex-col justify-center'>
        <Image
          src='/profile_256.webp'
          width={256}
          height={256}
          alt=''
          className='mx-auto rounded-full'
        />
        <h1 className='mx-auto'>Ryo Takeuchi</h1>
      </ContentLayout>
    </MainLayout>
  );
};

export default Home;
