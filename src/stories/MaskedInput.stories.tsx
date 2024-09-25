import type { Meta, StoryObj } from '@storybook/react';

import { MaskedInput } from '../../lib';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/MaskedInput',
  component: MaskedInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    mask: {
      control: 'object',
      description: 'The input mask to use which can be an array or a function',
    },
    type: {
      control: 'select',
      options: ['text', 'tel', 'url', 'password', 'search'],
      description: 'The type for the input',
    },
    guide: {
      control: 'boolean',
      description: 'It tells the component whether to be in guide or no guide mode',
    },
    pipe: {
      type: 'function',
      control: 'object',
      description:
        'A function that will give you the opportunity to modify the conformed value before it is displayed on the screen',
    },
    placeholderChar: {
      control: 'text',
      description: 'The placeholder character represents the fillable spot in the mask',
    },
    keepCharPositions: {
      control: 'boolean',
    },
    showMask: {
      control: 'boolean',
      description:
        'It tells the Text Mask component to display the mask as a placeholder in place of the regular placeholder when the input element value is empty',
    },
    render: {
      type: 'function',
      control: 'object',
    },
    value: {
      control: 'text',
    },
    defaultValue: {
      control: 'text',
    },
    onChange: {
      type: 'function',
      control: 'object',
    },
    onBlur: {
      type: 'function',
      control: 'object',
    },
  },
} satisfies Meta<typeof MaskedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TelephoneInput: Story = {
  args: {
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    type: 'tel',
    guide: false,
    placeholderChar: '_',
    showMask: true,
    keepCharPositions: false,
  },
};
