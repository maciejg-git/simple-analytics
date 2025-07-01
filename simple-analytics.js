const supabaseProjectId = "";
const supabaseTable = "visits";
const supabasePath = `/rest/v1/${supabaseTable}`;
const endpoint = `https://${supabaseProjectId}.supabase.co${supabasePath}`;

const supabasePublicApiKey = "";

let ignoreProtocol = ["file:"];
let ignoreHostname = ["localhost"];

let isValidVisit = () => {
  if (
    ignoreProtocol.includes(window.location.protocol) ||
    ignoreHostname.includes(window.location.hostname)
  ) {
    return false;
  }

  return true
}

window.addEventListener("load", () => {
  if (!isValidVisit()) return

  let headers = {
    "Content-Type": "application/json",
    apikey: supabasePublicApiKey,
    Authorization: `Bearer ${supabasePublicApiKey}`,
  };

  fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      url: window.location.href,
      date: new Date().toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    }),
  }).catch((err) => {
    console.error("Visit tracking failed:", err);
  });
});
