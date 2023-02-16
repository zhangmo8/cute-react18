import path from 'path';
import fs from 'fs';
import typescript2 from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

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

export function getBasePlugins({ typescript = {} } = {}) {
  return [cjs(), typescript2(typescript)];
}
