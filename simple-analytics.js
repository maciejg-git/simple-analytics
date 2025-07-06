function initSimpleAnalytics(projectId, apiKey, userConfig = {}) {
  if (!projectId) {
    return;
  }
  if (!apiKey) {
    return;
  }
  if (!userConfig.table) {
    return;
  }

  const supabasePath = `/rest/v1/${userConfig.table}`;
  const supabaseEndpoint = `https://${projectId}.supabase.co${supabasePath}`;

  let config = {
    skipOriginCheck: false,
    ignoreProtocol: ["file:"],
    ignoreHostname: ["localhost"],
    ignorePathname: [],
    trackVisitOncePerSession: false,
    trackVisitOncePerSessionKey: "isVisited",
    trackOnCustomEvent: true,
    ...userConfig,
  };

  let isValidOrigin = () => {
    if (
      config.ignoreProtocol.includes(window.location.protocol) ||
      config.ignoreHostname.includes(window.location.hostname) ||
      config.ignorePathname.includes(window.location.pathname)
    ) {
      return false;
    }

    return true;
  };

  let track = async (detail) => {
    if (!config.skipOriginCheck && !isValidOrigin()) {
      return;
    }

    let headers = {
      "Content-Type": "application/json",
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    };

    try {
      let res = await fetch(supabaseEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          url: window.location.href,
          hostname: window.location.hostname,
          pathname: window.location.pathname,
          timestamp: new Date().toISOString(),
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          detail,
        }),
      });

      return res;
    } catch (err) {
      console.error("Tracking failed:", err);
      return false;
    }
  };

  let trackVisit = () => {
    if (
      config.trackVisitOncePerSession &&
      sessionStorage.getItem(config.trackVisitOncePerSessionKey)
    ) {
      return;
    }

    let res = track("visit");

    if (res.ok && config.trackVisitOncePerSession) {
      sessionStorage.setItem(config.trackVisitOncePerSessionKey, "true");
    }
  };

  window.addEventListener("load", (ev) => {
    trackVisit();

    if (config.trackOnCustomEvent) {
      window.addEventListener("sa-track", (ev) => {
        track(ev.detail);
      });
    }
  });
}
