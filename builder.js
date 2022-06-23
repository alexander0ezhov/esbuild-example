const { sassPlugin, postcssModules } = require("esbuild-sass-plugin");
const isProd = process.env.NODE_ENV === "production"

const builderParams = {
  entryPoints: ["src/index.js"],
  bundle: true,
  loader: { ".js": "jsx", ".css": "css" },
  outfile: "dist/index.js",
  plugins: [
    sassPlugin({
      transform: postcssModules({}),
    }),
  ],
};


isProd ? require("esbuild").build(builderParams) : require("esbuild")
  .serve(
    {
      servedir: "dist",
      port: 3000,
    },
    builderParams
  )
  .then((server) => {
      console.log('\x1b[32m', `🟢 Serving at ${server.host}:${server.port}`)
  })
