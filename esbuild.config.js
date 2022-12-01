const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    format: "cjs",
    target: "node16",
    platform: "node",
    outfile: "build/bundle.cjs",
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    format: "esm",
    target: "node16",
    platform: "node",
    outfile: "build/bundle.mjs",
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
