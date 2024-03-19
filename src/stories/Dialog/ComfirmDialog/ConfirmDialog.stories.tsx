import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ConfirmDialog } from './ConfirmDialog'

const meta = {
  title: 'BTW-Custom/Dialog/ConfirmDialog',
  component: ConfirmDialog,
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
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

// component
const ArgsComponent = () => {
  return (
    <p>You can make changes after confirm</p>
  )
}

export const Light: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  args: {
    title: 'Is this content okay?',
    children: <ArgsComponent />,
    colorTheme: 'light',
    buttonString: 'OK',
    ariaLabel: 'Is this content okay?',
  }
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  args: {
    title: 'Is this content okay?',
    children: <ArgsComponent />,
    colorTheme: 'dark',
    buttonString: 'OK',
    ariaLabel: 'Is this content okay?',
  }
}