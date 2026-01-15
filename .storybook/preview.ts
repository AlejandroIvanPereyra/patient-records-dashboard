import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  // 👇 Enables auto-generated documentation for all stories
  tags: ['autodocs'],
  
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    docs: {
      // 👇 Enables table of contents for documentation pages
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        title: 'Table of Contents',
        disable: false,
      },
    },
  },
};

export default preview;