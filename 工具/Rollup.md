<div class="title">Rollup</div>

##  1. Webpack与Rollup
1. `Webpack`的优势在于它更全面，基于“一切皆模块”的思想而衍生出丰富的loader和plugin可以满足各种使用场景；
2. `Rollup`更专注于JavaScript的打包。Rollup也支持许多其他类型的模块，但是总体而言在通用性上还是不如Webpack。如果需求仅仅是打包JavaScript，比如一个JavaScript库，那么Rollup会是优选。

## 2. example react-router rollup.config.js
配置简单明了
```js
const path = require("path");
const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");

const pkg = require("./package.json");

function isBareModuleId(id) {
  return (
    !id.startsWith(".") && !id.includes(path.join(process.cwd(), "modules"))
  );
}

const cjs = [
  {
    input: "modules/index.js",
    output: {
      file: `cjs/${pkg.name}.js`,
      sourcemap: true,
      format: "cjs",
      esModule: false
    },
    external: isBareModuleId,
    plugins: [
      babel({ exclude: /node_modules/, sourceMaps: true, rootMode: "upward" }),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") })
    ]
  },
  {
    input: "modules/index.js",
    output: { file: `cjs/${pkg.name}.min.js`, sourcemap: true, format: "cjs" },
    external: isBareModuleId,
    plugins: [
      babel({ exclude: /node_modules/, sourceMaps: true, rootMode: "upward" }),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      uglify()
    ]
  }
];

const esm = [
  {
    input: "modules/index.js",
    output: { file: `esm/${pkg.name}.js`, sourcemap: true, format: "esm" },
    external: isBareModuleId,
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        sourceMaps: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]],
        rootMode: "upward"
      })
    ]
  }
];

const globals = { react: "React" };

const umd = [
  {
    input: "modules/index.js",
    output: {
      file: `umd/${pkg.name}.js`,
      sourcemap: true,
      sourcemapPathTransform: relativePath =>
        relativePath.replace(/^.*?\/node_modules/, "../../node_modules"),
      format: "umd",
      name: "ReactRouterDOM",
      globals
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        sourceMaps: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]],
        rootMode: "upward"
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "../../node_modules/react-is/index.js": ["isValidElementType"]
        }
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      })
    ]
  },
  {
    input: "modules/index.js",
    output: {
      file: `umd/${pkg.name}.min.js`,
      sourcemap: true,
      sourcemapPathTransform: relativePath =>
        relativePath.replace(/^.*?\/node_modules/, "../../node_modules"),
      format: "umd",
      name: "ReactRouterDOM",
      globals
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        sourceMaps: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]],
        rootMode: "upward"
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "../../node_modules/react-is/index.js": ["isValidElementType"]
        }
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      uglify()
    ]
  }
];

let config;
switch (process.env.BUILD_ENV) {
  case "cjs":
    config = cjs;
    break;
  case "esm":
    config = esm;
    break;
  case "umd":
    config = umd;
    break;
  default:
    config = cjs.concat(esm).concat(umd);
}

module.exports = config;
```

## 3. tree shaking
支持tree shaking

## 4. 可选的输出格式
`Rollup`有一项`Webpack`不具备的特性，即通过配置`output.format`开发者可以选择输出资源的模块形式。上面例子中我们使用的是`cjs（Com-monJS）`，除此之外Rollup还支持`amd、esm、iife、umd及system`。