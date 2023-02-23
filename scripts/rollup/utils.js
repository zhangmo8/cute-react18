import path from 'path';
import fs from 'fs';
import typescript2 from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import rollupPkgJson from 'rollup-plugin-generate-package-json';

// packages path
const pkgPath = path.resolve(__dirname, '../../packages');

// build path
const buildPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isBuild) {
  if (isBuild) {
    return `${buildPath}/${pkgName}`;
  }
  return `${pkgPath}/${pkgName}`;
}

export function getPackageJson(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`;

  const pkgJsonStr = fs.readFileSync(path, { encoding: 'utf8' });
  return JSON.parse(pkgJsonStr);
}

export function getBasePlugins({ typescript = {}, generatePkgOption = {} } = {}) {
  if (generatePkgOption.switch) {
    return [
      cjs(),
      typescript2(typescript),
      rollupPkgJson({
        main: 'index.js',
        inputFolder: generatePkgOption.inputFolder,
        outputFolder: generatePkgOption.outputFolder,
        baseContents: ({ name, version, description }) => ({ name, version, description })
      })
    ];
  }

  return [cjs(), typescript2(typescript)]
}
