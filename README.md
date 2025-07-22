# simple-analytics

Super simple analytics script that tracks visits of your pages. It uses Supabase by default but can be easily modified to send data to any backend.

### Features

- super simple
- tracks views per hostname and pathname, including date, referrer and user agent
- totally private
- easy to self-host, just create supabase project and run few SQL scripts
- tracks views by default, but can be extended to track anything by dispatching custom events

### Usage

Add script to tracked pages:

```html
<script src="./simple-analytics.js"></script>
<script>
  initSimpleAnalytics(
    projectId,
    apiKey,
    { table: "simple_analytics" },
  );
</script>
```
