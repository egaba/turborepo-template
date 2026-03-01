import type { Preview } from '@storybook/react'
import './globals.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'DaisyUI Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'obsidian-light', title: 'Light', icon: 'sun' },
          { value: 'obsidian-dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'obsidian-light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'obsidian-light'
      document.documentElement.setAttribute('data-theme', theme)
      return Story()
    },
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '900px' } },
        wide: { name: 'Wide', styles: { width: '1536px', height: '900px' } },
      },
    },
  },
}

export default preview
