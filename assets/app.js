(function(){
  const cfg = window.REFERRAL_CONFIG || {};
  const links = (cfg.affiliateLinks || {});

  function getLink(key){
    const url = links[key];
    if(url && /^https?:\/\//i.test(url)) return url;
    return "#setup";
  }

  function track(name, params){
    if(typeof window.gtag === "function"){
      window.gtag("event", name, params || {});
    }
    try{
      const log = JSON.parse(localStorage.getItem("trippick_events") || "[]");
      log.push({name, params: params || {}, at: new Date().toISOString()});
      localStorage.setItem("trippick_events", JSON.stringify(log.slice(-200)));
    }catch(e){}
  }

  document.querySelectorAll("[data-affiliate]").forEach(el=>{
    const key = el.dataset.affiliate;
    el.setAttribute("href", getLink(key));
    el.addEventListener("click", e=>{
      track("affiliate_click",{partner:key, placement:el.dataset.placement || "unknown"});
      if(getLink(key)==="#setup"){
        e.preventDefault();
        document.getElementById("setup").scrollIntoView({behavior:"smooth"});
      }
    });
  });

  const ga = cfg.analytics && cfg.analytics.ga4MeasurementId;
  if(ga){
    const s1=document.createElement("script");
    s1.async=true;
    s1.src=`https://www.googletagmanager.com/gtag/js?id=${ga}`;
    document.head.appendChild(s1);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments)}
    gtag("js",new Date());
    gtag("config",ga);
  }
})();