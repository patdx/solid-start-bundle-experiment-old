import { resolve } from "import-meta-resolve";

const result = await resolve("solid-js/web", import.meta.url);

console.log(result);
