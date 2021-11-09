// import chokidar from "chokidar";
const esbuild = require("esbuild");
const fs = require("fs");
const {
  dependencies,
  peerDependencies,
  name,
  version,
  author,
} = require("./package.json");
const { Generator } = require("npm-dts");

const { nodeExternalsPlugin } = require("esbuild-node-externals");

const esbuildOptions = {
  // outfile: "dist/lib.js",
  // outdir: "dist",
  bundle: true,
  minify: false,
  // platform: "node",
  // format: "esm",
  sourcemap: true,
  // plugins: [nodeExternalsPlugin()],
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

async function build(files_) {
  return await esbuild
    .build({
      target: "node14",
      outfile: "dist/lib.js",
      entryPoints: files_,
      ...esbuildOptions,
    })
    .catch(() => process.exit(1));
}

async function buildEsm(files_) {
  return await esbuild
    .build({
      outfile: "dist/lib.js",
      format: "cjs",
      platform: "browser",
      inject: ["./react-shim.js"],
      entryPoints: files_,
      ...esbuildOptions,
    })
    .catch(() => process.exit(1));
}

const files = ["src/lib.ts"];

buildEsm(files)
  // .then(() => buildEsm(files))
  .then(() =>
    new Generator({
      entry: "lib.ts",
      output: "dist/lib.d.ts",
    }).generate()
  )
  .then(() =>
    fs.writeFileSync(
      "dist/package.json",
      JSON.stringify(
        {
          name,
          version,
          author,
          // module: "lib.esm.js",
          main: "lib.js",
          typings: "lib.d.ts",
          peerDependencies,
          dependencies,
        },
        null,
        2
      ),
      "utf-8"
    )
  )
  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
