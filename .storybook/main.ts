import type { StorybookConfig } from '@storybook/nextjs';

const path = require('path');

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
  staticDirs: ["../public"],
  docs: {
    autodocs: 'tag',
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
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return prop.parent
          ? /@radix-ui/.test(prop.parent.fileName) || !/node_modules/.test(prop.parent.fileName)
          : true;
      },
    },
  },
};
export default config;
