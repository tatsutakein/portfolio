import { ReactNode } from 'react';

export interface BlogLayoutProps {
  id: string;
}

export const BlogLayout = (props: BlogLayoutProps & { children: ReactNode }): JSX.Element => {
  return (
    <>
      <header>{props.id}</header>
      <main>{props.children}</main>
      <footer />
    </>
  );
};
