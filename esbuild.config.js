// import chokidar from "chokidar";
const esbuild = require("esbuild");

const { nodeExternalsPlugin } = require("esbuild-node-externals");

const esbuildOptions = {
  outfile: "lib.js",
  bundle: true,
  minify: false,
  format: "cjs",
  sourcemap: "inline",
  plugins: [nodeExternalsPlugin()],
};

async function build(files_) {
  return await esbuild
    .build({
      target: "es6",
      entryPoints: files_,
      ...esbuildOptions,
    })
    .catch(() => process.exit(1));
}

build(["src/lib.ts"])
  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
