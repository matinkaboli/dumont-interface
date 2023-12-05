import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#060607',
        },
        {
          name: 'light',
          value: '#fff',
        },
      ],
    },
  },
};

export default preview;
