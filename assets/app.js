(function () {
  const cfg = window.REFERRAL_CONFIG || {};
  const links = cfg.affiliateLinks || {};

  function validUrl(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url);
  }

  function track(name, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, params || {});
      }

      const log = JSON.parse(
        localStorage.getItem("trippick_events") || "[]"
      );

      log.push({
        name,
        params: params || {},
        at: new Date().toISOString()
      });

      localStorage.setItem(
        "trippick_events",
        JSON.stringify(log.slice(-200))
      );
    } catch (e) {}
  }

  document.querySelectorAll("[data-affiliate]").forEach((el) => {
    const key = el.dataset.affiliate;
    const configuredUrl = links[key];

    if (validUrl(configuredUrl)) {
      el.setAttribute("href", configuredUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "sponsored nofollow noopener");
    } else {
      const currentHref = el.getAttribute("href");

      if (!validUrl(currentHref)) {
        el.setAttribute("href", "#");
      }
    }

    el.addEventListener("click", (e) => {
      const href = el.getAttribute("href");

      track("affiliate_click", {
        partner: key || "unknown",
        placement: el.dataset.placement || "unknown",
        href: href || ""
      });

      if (!validUrl(href)) {
        e.preventDefault();
        alert("제휴 링크를 준비 중입니다.");
      }
    });
  });

  const ga =
    cfg.analytics &&
    cfg.analytics.ga4MeasurementId;

  if (ga) {
    const s = document.createElement("script");
    s.async = true;
    s.src =
      "https://www.googletagmanager.com/gtag/js?id=" + ga;

    document.head.appendChild(s);

    window.dataLayer =
      window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", ga);
  }
})();
