import '@/styles/globals.css';
import { GoogleAnalytics, usePageView } from '@/lib';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  usePageView();

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
