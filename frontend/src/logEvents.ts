export function injectGtagScript() {
  const tagId = process.env.REACT_APP_GA_TRACKING_ID;
  const s: HTMLScriptElement = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  head.appendChild(s);
}

export function dynamicGtag(...args: any) {
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  window.dataLayer.push(arguments);
}

export function logEvent(action: any, params: any) {
  dynamicGtag('event', action, params)
}

export function setGAUserId(userId: any) {
  dynamicGtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
    user_id: userId,
  });
}