import { requireCmsListMetadata } from './rules/require-cmslist-metadata';
import type { FlatConfig, Linter } from '@typescript-eslint/utils/ts-eslint';

export const rules = {
    'require-cmslist-metadata': requireCmsListMetadata,
};

const plugin: Linter.Plugin = {
    rules,
};

const recommended: FlatConfig.Config = {
    name: 'flammeo-cms/recommended',
    plugins: {
        '@flammeo-cms': plugin,
    },
    rules: {
        '@flammeo-cms/require-cmslist-metadata': 'error',
    },
};

export const configs = {
    recommended: recommended,
};

Object.assign(plugin, { ...plugin, configs });

export default plugin;
