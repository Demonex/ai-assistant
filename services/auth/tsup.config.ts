import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  format: ["esm"],
  target: "node23",
  splitting: false,
  clean: true,
  sourcemap: true,
  /**
   * The common package is using the internal packages approach, so it needs to
   * be transpiled / bundled together with the deployed code.
   */
  noExternal: ["@repo/common"],
  /**
   * Do not use tsup for generating d.ts files because it can not generate type
   * the definition maps required for go-to-definition to work in our IDE. We
   * use tsc for that.
   */
  esbuildOptions(options) {
    options.platform = "node";
    options.logLevel = "error";
  },
});
