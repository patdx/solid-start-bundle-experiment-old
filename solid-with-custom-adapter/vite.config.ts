import solid from "solid-start/vite";
import { defineConfig } from "vite";
import customAdapter from "./custom-adapter/index";

export default defineConfig({
  plugins: [
    solid({
      adapter: customAdapter(),
    }),
  ],
});
