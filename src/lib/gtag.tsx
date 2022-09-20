import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';

// ========================================================================
//
// Event
//
// ========================================================================
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '';

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== '';

// PVを測定する
export const pageview: (path: string) => void = (path) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

// GAイベントを発火させる
export const event: (event: Event) => void = ({ action, category, label, value = '' }) => {
  if (!existsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};

// ========================================================================
//
// Hook
//
// ========================================================================
export const usePageView: () => void = () => {
  const { events } = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    events.on('routeChangeComplete', handleRouteChange);
    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);
};

// ========================================================================
//
// Component
//
// ========================================================================
export const GoogleAnalytics: React.FC = (): JSX.Element => (
  <>
    {existsGaId && (
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy='afterInteractive'
        />
        <Script
          id='ga'
          defer
          strategy='afterInteractive'
        >
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
        </Script>
      </>
    )}
  </>
);

// ========================================================================
//
// Event
//
// ========================================================================
type ContactEvent = {
  action: 'submit_form';
  category: 'contact';
};

type ClickEvent = {
  action: 'click';
  category: 'other';
};

export type Event = (ContactEvent | ClickEvent) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
};
