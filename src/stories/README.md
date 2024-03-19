# StoryBook Component Template

## Template.tsx

```ts
import React from 'react'
import './template.scss'

interface TemplateProps {

}

export const Template = ({

}: TemplateProps) => {

  return (
    <></>
  )
}
```

## Template.stories.ts

```ts
import type { Meta, StoryObj } from '@storybook/react'

import { Template } from './Template'

const meta = {
  title: 'BTW-Custom/Template',
  component: Template,
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
} satisfies Meta<typeof Template>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  args: {

  }
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  args: {
    
  }
}
```