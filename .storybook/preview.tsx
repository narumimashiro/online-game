import React from 'react';

import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
  },
  decorators: [
    (Story) => (
      <div style={{
        minWidth: '390px',
        width: '39vw',
        minHeight: '250px',
        height: '39svh'
      }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;