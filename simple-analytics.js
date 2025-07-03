const supabaseProjectId = "";
const supabaseTable = "visits";
const supabasePath = `/rest/v1/${supabaseTable}`;
const endpoint = `https://${supabaseProjectId}.supabase.co${supabasePath}`;

const supabasePublicApiKey = "";

let ignoreProtocol = ["file:"];
let ignoreHostname = ["localhost"];
let ignorePathname = [];

const trackOncePerSession = true;
const trackOncePerSessionKey = "isVisited";

let isValidVisit = () => {
  if (
    ignoreProtocol.includes(window.location.protocol) ||
    ignoreHostname.includes(window.location.hostname) ||
    ignorePathname.includes(window.location.pathname)
  ) {
    return false;
  }

  return true;
};

window.addEventListener("load", async () => {
  if (!isValidVisit()) {
    return;
  }

  if (trackOncePerSession && sessionStorage.getItem(trackOncePerSessionKey)) {
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
      }),
    });

    if (trackOncePerSession) {
      sessionStorage.setItem(trackOncePerSessionKey, "true");
    }
  } catch (err) {
    console.error("Visit tracking failed:", err);
  }
});
