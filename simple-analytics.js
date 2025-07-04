const supabaseProjectId = "";
const supabaseTable = "visits";
const supabasePath = `/rest/v1/${supabaseTable}`;
const endpoint = `https://${supabaseProjectId}.supabase.co${supabasePath}`;

const supabasePublicApiKey = "";

let ignoreProtocol = ["file:"];
let ignoreHostname = ["localhost"];
let ignorePathname = [];

const trackVisitOncePerSession = true;
const trackVisitOncePerSessionKey = "isVisited";

let isValidOrigin = () => {
  if (
    ignoreProtocol.includes(window.location.protocol) ||
    ignoreHostname.includes(window.location.hostname) ||
    ignorePathname.includes(window.location.pathname)
  ) {
    return false;
  }

  return true;
};

let track = async (detail) => {
  if (!isValidOrigin()) {
    return;
  }

  let headers = {
    "Content-Type": "application/json",
    apikey: supabasePublicApiKey,
    Authorization: `Bearer ${supabasePublicApiKey}`,
  };

  try {
    let res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        url: window.location.href,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        detail,
      }),
    });

    return res.ok
  } catch (err) {
    console.error("Tracking failed:", err);
    return false
  }
};

let trackVisit = () => {
  if (
    trackVisitOncePerSession &&
    sessionStorage.getItem(trackVisitOncePerSessionKey)
  ) {
    return;
  }

  let res = track("visit");

  if (trackVisitOncePerSession) {
    sessionStorage.setItem(trackVisitOncePerSessionKey, "true");
  }
};

window.addEventListener("load", (ev) => {
  trackVisit();
  window.addEventListener("sa-track", (ev) => {
    track(ev.detail);
  });
});
