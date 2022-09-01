import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflareWorkers from "solid-start-cloudflare-workers";

export default defineConfig({
  plugins: [
    solid({
      adapter: cloudflareWorkers(),
    }),
  ],
});
