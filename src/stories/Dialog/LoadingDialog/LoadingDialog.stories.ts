import type { Meta, StoryObj } from '@storybook/react'

import { LoadingDialog } from './LoadingDialog'

const meta = {
  title: 'BTW-Custom/Dialog/LoadingDialog',
  component: LoadingDialog,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        {name: 'light', value: '#FFFFFF'},
        {name: 'dark', value: '#000000'}
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    colorTheme: {
      control: {
        type: 'radio',
        options: ['light', 'dark']
      }
    },
  }
} satisfies Meta<typeof LoadingDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  args: {
    colorTheme: 'light',
    title: 'Title Text',
    message: 'You can set message'
  }
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  args: {
    colorTheme: 'dark',
    title: 'Title Text',
    message: 'You can set message'
  }
}