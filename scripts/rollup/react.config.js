import { getPackageJson, getBasePlugins, resolvePkgPath } from './utils';

// pkgName
const { name, module } = getPackageJson('react');

// react package path
const pkgPath = resolvePkgPath(name);
// react.build.js
const buildPath = resolvePkgPath(name, true);

export default [
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${buildPath}/index.js`,
      name: 'index.js',
      format: 'umd'
    },
    plugins: getBasePlugins({ generatePkgOption: { switch: true, inputFolder: pkgPath, outputFolder: buildPath } })
  },
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      // jsx run time
      {
        file: `${buildPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      },
      // jsx dev run time
      {
        file: `${buildPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd'
      }
    ],
    plugins: getBasePlugins()
  }
];
