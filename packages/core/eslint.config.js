import { config } from '@flammeo-cms/eslint-config/base';
import { configs } from '@flammeo-cms/eslint-plugin';

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: ['dist/**'],
    },
    ...config,
    configs.recommended,
];
