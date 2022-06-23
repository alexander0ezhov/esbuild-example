const fs = require('fs')
const {sassPlugin, postcssModules} = require("esbuild-sass-plugin");
const esbuild = require("esbuild")
const isProd = process.env.NODE_ENV === "production"
const dist = isProd ? 'dist' : "public"

const builderParams = {
    entryPoints: ["src/index.js"],
    bundle: true,
    loader: {".js": "jsx"},
    outfile: `${dist}/index.js`,
    plugins: [
        sassPlugin({
            transform: postcssModules({}),
        }),
    ],
};

const runProd = async () => {
    await fs.rmSync(dist, {recursive: true, force: true});
    await fs.mkdirSync(dist)
    await fs.copyFileSync('public/index.html', "dist/index.html")
    await esbuild.build(builderParams)
}

const runDev = async () => {
    esbuild
        .serve(
            {
                servedir: dist,
                port: 3000,
            },
            builderParams
        )
        .then((server) => {
            console.log('\x1b[32m', `🟢 Serving at ${server.host}:${server.port}`)
        })
}

isProd ? runProd() : runDev()
