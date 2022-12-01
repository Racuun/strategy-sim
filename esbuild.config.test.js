const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["test/test.ts"],
    bundle: true,
    format: "cjs",
    target: "node16",
    platform: "node",
    outfile: "build/test.cjs",
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
