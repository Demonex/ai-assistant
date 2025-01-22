import { defineConfig } from "tsup";
import { writeFileSync } from "fs";

export default defineConfig({
  entry: ["src"],
  format: ["esm"],
  target: "node23",
  splitting: false,
  clean: false,
  sourcemap: true,
  silent: true,
  /**
   * The common package is using the internal packages approach, so it needs to
   * be transpiled / bundled together with the deployed code.
   */
  noExternal: ["@repo/common", "@repo/auth",],
  /**
   * Do not use tsup for generating d.ts files because it can not generate type
   * the definition maps required for go-to-definition to work in our IDE. We
   * use tsc for that.
   */
  esbuildOptions(options) {
    options.platform = "node";
    options.logLevel = "error";
  },
  onSuccess: async () => {
    writeFileSync(`${import.meta.dirname}/dist/build.info`, new Date().toISOString(), "utf-8");
    console.info("build success");
  },
});
