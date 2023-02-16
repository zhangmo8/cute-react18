import { getPackageJson, getBasePlugins, resolvePkgPath } from './utils';

// pkgName
const { name, module } = getPackageJson('react');

// react package path
const pkgPath = resolvePkgPath(name);
// react.build.js
const buildPath = resolvePkgPath(name, true);

console.log('pkgPath', pkgPath);
console.log('buildPath', buildPath);

export default [
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${buildPath}/index.js`,
      name: 'index.umd.js',
      format: 'umd'
    },
    plugin: getBasePlugins({})
  },
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      // jsx run time
      {
        file: `${buildPath}/jsx-runtime.js`,
        name: 'jsx-runtime.umd.js',
        format: 'umd'
      },
      // jsx dev run time
      {
        file: `${buildPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.umd.js',
        format: 'umd'
      }
    ],
    plugin: getBasePlugins({})
  }
];
