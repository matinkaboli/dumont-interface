import type { StorybookConfig } from '@storybook/nextjs';
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

const path = require('path');

addons.setConfig({
  theme: themes.dark,
});

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config: any) => {
    config.module!.rules!.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });

    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.resolve.alias['@/pages'] = path.resolve(__dirname, '../src/pages');
    config.resolve.alias['@/components'] = path.resolve(__dirname, '../src/components');

    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
