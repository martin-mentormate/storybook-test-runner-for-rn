import type { Preview } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      // Optional selector to inspect
      element: '#storybook-root',
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'image-alt',
            enabled: false,
          },
        ],
      },
      // Axe's options parameter
      options: {},
      // Optional flag to prevent the automatic check
      manual: true,
    },
    viewport: {
      viewports: {
        desktop: {
          name: "Default",
          styles: { width: "1440px", height: "900px" },
          type: "desktop"
        },
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "660px" },
          type: "mobile"
        },
      },
      defaultViewport: 'Default',
    }
  },
};

export default preview;
