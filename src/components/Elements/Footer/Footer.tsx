import Image from 'next/future/image';
import Link from 'next/link';

import { ContentLayout } from '@/components/Layout';

const footerLinkList = [
  { title: 'ホーム', link: '/' },
  { title: '技術ブログ', link: '/tech' },
  { title: '制作実績', link: '/works' },
  { title: 'プライバシーポリシー', link: '/privacy' },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className='bg-gray-50 py-10'>
      <ContentLayout>
        <div className='flex flex-col items-start justify-between md:flex-row'>
          {/* ロゴ */}
          <Link href='/'>
            <a>
              <Image
                src='/logo.svg'
                width={128}
                height={32}
                alt='ripomoea'
              />
            </a>
          </Link>

          {/* ナビゲーション */}
          <nav className='mt-4'>
            <ol>
              {footerLinkList.map(({ title, link }) => (
                <li key={title}>
                  <Link href={link}>
                    <a className='mb-1 block py-2 text-sm duration-300 hover:opacity-75 md:text-base'>
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <small className='mt-10 block text-center md:text-right'>&copy; 2022 ripomoea</small>
      </ContentLayout>
    </footer>
  );
};
