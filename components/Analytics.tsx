import React, { useEffect } from 'react';

// SUBSTITUA PELOS SEUS IDS REAIS
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; 
export const FB_PIXEL_ID = '1234567890';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  if (typeof window.fbq === 'function') {
    // Mapeamento básico para eventos padrão do Facebook
    const fbEventMap: Record<string, string> = {
      'add_to_cart': 'AddToCart',
      'begin_checkout': 'InitiateCheckout',
      'purchase': 'Purchase',
      'view_item': 'ViewContent'
    };
    
    const fbEvent = fbEventMap[eventName] || 'CustomEvent';
    window.fbq('track', fbEvent, params);
  }
};

export const Analytics: React.FC = () => {
  useEffect(() => {
    // 1. Google Analytics 4 (GA4) Initialization
    const gaScript = document.createElement('script');
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    window.gtag = gtag;

    // 2. Meta Pixel Initialization
    const fbScript = document.createElement('script');
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);

    return () => {
      // Cleanup is usually not strictly necessary for analytics scripts in SPA 
      // as we want them to persist, but good practice to know where they are.
      document.head.removeChild(gaScript);
      document.head.removeChild(fbScript);
    };
  }, []);

  return null; // Componente lógico, não renderiza nada visualmente
};