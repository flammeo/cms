import { config } from '@flammeo-cms/eslint-config/base';

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: ['dist/**'],
    },
    ...config,
];
