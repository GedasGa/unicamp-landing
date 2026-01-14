'use client';

import { useEffect } from 'react';

import { usePathname } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function ThirdPartyScripts() {
  const pathname = usePathname();
  
  // Don't load scripts on /app routes (authenticated dashboard)
  const shouldLoadScripts = !pathname.startsWith('/app');

  useEffect(() => {
    if (!shouldLoadScripts) return;

    // Load Cookiebot script
    if (!document.getElementById('Cookiebot')) {
      const cookiebotScript = document.createElement('script');
      cookiebotScript.id = 'Cookiebot';
      cookiebotScript.src = 'https://consent.cookiebot.com/uc.js';
      cookiebotScript.setAttribute('data-cbid', '3fa518db-b45e-4654-ac5e-93704112569d');
      cookiebotScript.setAttribute('data-blockingmode', 'auto');
      cookiebotScript.type = 'text/javascript';
      cookiebotScript.defer = true;
      document.head.appendChild(cookiebotScript);
    }

    // Initialize OpenWidget
    if (typeof window !== 'undefined' && !window.OpenWidget) {
      const script = document.createElement('script');
      script.innerHTML = `
        window.__ow = window.__ow || {};
        window.__ow.organizationId = "ce2e459e-4f09-45ea-b5d6-30bca71720cf";
        window.__ow.integration_name = "manual_settings";
        window.__ow.product_name = "openwidget";
        (function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
        var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},
        once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},
        get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");
        return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},
        init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",
        n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};
        !n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice));
      `;
      document.body.appendChild(script);
    }
  }, [shouldLoadScripts]);

  return null;
}

// TypeScript declarations
declare global {
  interface Window {
    __ow: any;
    OpenWidget: any;
  }
}
