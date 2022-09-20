import Image from 'next/future/image';
import Link from 'next/link';
import React from 'react';

import { TechArticle } from '@/features/tech';
import { formatDate } from '@/lib';

type ArticleListProps = {
  articles: Array<TechArticle>;
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <ul className='mx-auto divide-y-2 divide-gray-100'>
      {articles.map((article) => (
        <li
          className='relative select-none transition-all duration-150 hover:hover:bg-primary/10 focus:bg-primary/10 active:active:bg-primary/20'
          key={article.id}
        >
          <Link href={`tech/${article.id}`}>
            <a
              className='flex flex-wrap justify-center md:flex-nowrap md:justify-start'
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className='flex flex-wrap items-center md:flex-nowrap'>
                <div className='relative h-64 w-full shrink-0 md:h-32 md:w-64'>
                  {article.eyecatch && (
                    <Image
                      className='absolute object-cover'
                      src={article.eyecatch.url}
                      fill
                      alt=''
                    />
                  )}
                </div>
                <div className='p-4 md:grow'>
                  <p className=''>{formatDate(article.publishedAt)}</p>
                  <h2 className='mt-2 mb-4 text-2xl md:text-xl'>{article.title}</h2>
                  {article.tags && (
                    <div className='flex flex-wrap gap-2'>
                      {article.tags.map((tag) => (
                        <p
                          key={tag.id}
                          className='rounded-full bg-primary/10 py-1 px-4 text-sm'
                        >
                          {tag.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
