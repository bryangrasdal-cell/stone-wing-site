/*
 * Stone Wing website analytics integration (pending GA4 ownership and measurement ID).
 * This script intentionally performs NO analytics request without a verified G- measurement ID.
 * A site admin enables it by adding a meta tag with the real GA4 web-stream ID:
 * A site administrator must supply the exact ID from the owned Google Analytics web stream.
 * No advertising personalization is enabled. Analytics requires visitor opt-in.
 */
(function(){
  'use strict';
  var meta=document.querySelector('meta[name="stonewing-ga4-id"]');
  var id=meta&&typeof meta.content==='string'?meta.content.trim():'';
  if (!/^G-[A-Z0-9]{4,}$/.test(id)) return;
  var KEY='stonewing-analytics-consent-v1';
  var consent=null;
  try { var saved=localStorage.getItem(KEY); if(saved==='granted'||saved==='denied') consent=saved; } catch(e){}
  var loaded=false, currentBanner=null;
  function setChoice(choice){
    consent=choice;
    try {localStorage.setItem(KEY,choice);} catch(e){}
    if(currentBanner){currentBanner.remove();currentBanner=null;}
    if(choice==='granted') enable();
    else if(loaded) location.reload();
  }
  function button(label,action){
    var el=document.createElement('button');
    el.type='button';el.textContent=label;
    el.style.cssText='background:#183d64;border:1px solid #589ed3;color:white;padding:9px 13px;border-radius:8px;cursor:pointer;font:inherit';
    el.addEventListener('click',action);return el;
  }
  function notice(){
    if(currentBanner)return;
    var wrap=document.createElement('aside');currentBanner=wrap;
    wrap.setAttribute('aria-label','Optional website analytics');
    wrap.style.cssText='position:fixed;z-index:9999;left:18px;right:18px;bottom:18px;max-width:790px;margin:0 auto;background:#0b1929;color:#e3efff;border:1px solid #4d7697;border-radius:14px;box-shadow:0 9px 40px #0008;padding:16px 18px;font:14px/1.55 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif';
    var title=document.createElement('strong');title.textContent='Optional website analytics';wrap.appendChild(title);
    var p=document.createElement('p');p.style.cssText='margin:7px 0 13px';
    p.textContent='Spindle & Stone would like to use Google Analytics to measure visits and which website buttons people use. Choose Allow to enable analytics or Decline to continue without it.';wrap.appendChild(p);
    var controls=document.createElement('div');controls.style.cssText='display:flex;flex-wrap:wrap;gap:9px;align-items:center';
    controls.appendChild(button('Allow analytics',function(){setChoice('granted');}));
    controls.appendChild(button('Decline',function(){setChoice('denied');}));
    var policy=document.createElement('a');policy.href='privacy.html';policy.textContent='Privacy policy';policy.style.cssText='color:#96ccfa;margin-left:6px';controls.appendChild(policy);
    wrap.appendChild(controls);document.body.appendChild(wrap);
  }
  function enable(){
    if(loaded)return;
    loaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js',new Date());
    window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('config',id,{send_page_view:true,allow_google_signals:false,allow_ad_personalization_signals:false});
    var tag=document.createElement('script');
    tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(tag);
  }
  window.addEventListener('stonewing:cta',function(evt){
    if(consent!=='granted'||!loaded||typeof window.gtag!=='function')return;
    var value=evt&&evt.detail&&evt.detail.cta;
    if(typeof value!=='string'||! /^[a-zA-Z0-9_-]{1,60}$/.test(value))return;
    window.gtag('event','stonewing_cta_click',{cta_id:value});
  });
  function init(){
    var footer=document.querySelector('footer');
    var manage=button('Analytics choices',notice);
    manage.style.cssText='background:transparent;border:1px solid #3b5570;color:#c6daeb;padding:7px 9px;border-radius:7px;cursor:pointer;font:12px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif';
    if(footer)footer.appendChild(manage);else document.body.appendChild(manage);
    if(consent==='granted')enable();
    else if(consent===null)notice();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
