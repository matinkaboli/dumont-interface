import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components';

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
    inspectComponents: [Select],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Select defaultValue="option1">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export function WithSeparator() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">Select an option</SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton />
        <SelectGroup>
          <SelectLabel>Group 1</SelectLabel>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectSeparator />
          <SelectLabel>Group 2</SelectLabel>
          <SelectItem value="option3">Option 3</SelectItem>
          <SelectItem value="option4">Option 4</SelectItem>
        </SelectGroup>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}

export function Disabled() {
  return (
    <Select disabled>
      <SelectTrigger className="w-[200px]">Disabled</SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  );
}
