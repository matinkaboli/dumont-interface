import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

import Redux from '../src/providers/Redux';
import Wagmi from '@/providers/Wagmi';
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
  decorators: [
    (Story) => (
      <Redux>
        <Wagmi>
          <Story />
        </Wagmi>
      </Redux>
    ),
  ],
};

export default preview;
