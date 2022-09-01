# plain-cloudflare-worker

Demonstration of setting up a graphql server in a plain worker

# solid-with-standard-adapter

Demonstration of setting up a graphql server on an API route in solid-start.

It does not work, see:

```
Circular dependency: node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/index.js -> node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/interface.js -> node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/index.js
Circular dependency: node_modules/.pnpm/undici@5.10.0/node_modules/undici/lib/fetch/util.js -> node_modules/.pnpm/undici@5.10.0/node_modules/undici/lib/fetch/file.js -> node_modules/.pnpm/undici@5.10.0/node_modules/undici/lib/fetch/util.js
Circular dependency: node_modules/.pnpm/undici@5.10.0/node_modules/undici/lib/fetch/util.js -> node_modules/.pnpm/undici@5.10.0/node_modules/undici/lib/fetch/file.js -> node_modules/.pnpm/undici@5.10.0/node_modules/undici/lib/fetch/webidl.js -> node_modules/.pnpm/undici@5.10.0/node_modules/undici/lib/fetch/util.js
 ⛅️ wrangler 2.0.28
--------------------
▲ [WARNING] Comparison with -0 using the "===" operator will also match 0 [equals-negative-zero]

    dist/server.js:52690:29:
      52690 │             } else if (x === -0) { // don't return negative zero
            ╵                              ~~

  Floating-point equality is defined such that 0 and -0 are equal, so "x === -0" returns true for
  both 0 and -0. You need to use "Object.is(x, -0)" instead to test for -0.

Retrieving cached values for userId from node_modules/.cache/wrangler
▲ [WARNING] Enabling node.js compatibility mode for built-ins and globals. This is experimental and has serious tradeoffs. Please see https://github.com/ionic-team/rollup-plugin-node-polyfills/ for more details.


▲ [WARNING] Comparison with -0 using the "===" operator will also match 0 [equals-negative-zero]

    dist/server.js:52690:29:
      52690 │             } else if (x === -0) { // don't return negative zero
            ╵                              ~~

  Floating-point equality is defined such that 0 and -0 are equal, so "x === -0" returns true for
  both 0 and -0. You need to use "Object.is(x, -0)" instead to test for -0.

✘ [ERROR] Could not resolve "stream/web"

    dist/server.js:13:24:
      13 │ import require$$10 from 'stream/web';
         ╵                         ~~~~~~~~~~~~

  The package "stream/web" wasn't found on the file system but is built into node. Are you trying to
  bundle for node? You can use "platform: 'node'" to do that, which will remove this error.

✘ [ERROR] Could not resolve "perf_hooks"

    dist/server.js:14:25:
      14 │ import require$$1$2 from 'perf_hooks';
         ╵                          ~~~~~~~~~~~~

  The package "perf_hooks" wasn't found on the file system but is built into node. Are you trying to
  bundle for node? You can use "platform: 'node'" to do that, which will remove this error.

✘ [ERROR] Could not resolve "util/types"

    dist/server.js:15:25:
      15 │ import require$$4$1 from 'util/types';
         ╵                          ~~~~~~~~~~~~

  The package "util/types" wasn't found on the file system but is built into node. Are you trying to
  bundle for node? You can use "platform: 'node'" to do that, which will remove this error.

✘ [ERROR] Could not resolve "async_hooks"

    dist/server.js:18:23:
      18 │ import require$$3 from 'async_hooks';
         ╵                        ~~~~~~~~~~~~~

  The package "async_hooks" wasn't found on the file system but is built into node. Are you trying
  to bundle for node? You can use "platform: 'node'" to do that, which will remove this error.


✘ [ERROR] Build failed with 4 errors:

  dist/server.js:13:24: ERROR: Could not resolve "stream/web"
  dist/server.js:14:25: ERROR: Could not resolve "perf_hooks"
  dist/server.js:15:25: ERROR: Could not resolve "util/types"
  dist/server.js:18:23: ERROR: Could not resolve "async_hooks"


If you think this is a bug then please create an issue at https://github.com/cloudflare/wrangler2/issues/new/choose
 ELIFECYCLE  Command failed with exit code 1.
```

# solid-with-custom-adapter

Main difference from the solid-start-cloudflare-workers adapter is

```diff
          nodeResolve({
            preferBuiltins: true,
            exportConditions: ["node", "solid"],
+           resolveOnly: ["solid-js"],
          }),
```
