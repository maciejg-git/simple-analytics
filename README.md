# simple-analytics

Super simple analytics script that tracks visits of your pages. It uses Supabase by default but can be easily modified to send data to any backend.

### Features

- super simple
- tracks views per hostname and pathname, including date, referrer and user agent
- totally private
- easy to self-host, just create supabase project and run few SQL scripts
- tracks views by default, but can be extended to track anything by dispatching custom events

### Usage

Create supabase project and run some SQL to prepare database and user:

```sql

```

Add script to tracked pages. The `prjectId`, `apiKey` and `table` are your supabase project ID, anon public api key and a table name. You can chcek these in supabase dashboard of your project.

```html
<script src="/simple-analytics.js"></script>
<script>
  initSimpleAnalytics(
    projectId,
    apiKey,
    { table: "simple_analytics" },
  );
</script>
```

You can test it locally by adding `skipOriginCheck` in the config object. This enables tracking views from `file:` protocol and `localhost` hostname.

```html
<script src="./simple-analytics.js"></script>
<script>
  initSimpleAnalytics(
    projectId,
    apiKey,
    { table: "simple_analytics", skipOriginCheck: true },
  );
</script>
```

### Configuration

Some settings can be modified in the config object. These include:

- `skipOriginCheck` - skips checking ignored protocols, hostnames and pathnames entirely. Useful for testing. Default: `false`.
- `ignoreProtocol` - array of ignored protocols. Default: `['file']`.
- `ignoreHostname` - array of ignored hostnames. Default: `['localhost']`.
- `ignorePathname` - array of ignored pathnames. Default: `[]`.
- `trackViewOncePerSession` - track views once per session. Default: `false`.
- `trackViewOncePerSessionKey` - key name of the sessionStorage property when `trackViewOncePerSession` is enabled.
- `trackOnCustomEvent` - adds listener for `sa-track` custom events to track any additional actions. Default: `false`.
