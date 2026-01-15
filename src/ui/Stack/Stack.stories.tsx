import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import { Card } from '../Card';
import { Text } from '../Text';
import { Button } from '../Button';

const meta = {
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible layout component that arranges children in a row or column with configurable spacing, alignment, and justification.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Layout direction',
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Spacing between items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
      description: 'Main-axis justification',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'md',
    children: (
      <>
        <Card><Text>Item 1</Text></Card>
        <Card><Text>Item 2</Text></Card>
        <Card><Text>Item 3</Text></Card>
      </>
    ),
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 'md',
    children: (
      <>
        <Button>Button 1</Button>
        <Button variant="secondary">Button 2</Button>
        <Button variant="outline">Button 3</Button>
      </>
    ),
  },
};

export const GapSizes: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-8">
      <div>
        <Text variant="title" size="sm" className="mb-2">Extra Small Gap</Text>
        <Stack gap="xs">
          <Card><Text size="sm">Item 1</Text></Card>
          <Card><Text size="sm">Item 2</Text></Card>
          <Card><Text size="sm">Item 3</Text></Card>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">Small Gap</Text>
        <Stack gap="sm">
          <Card><Text size="sm">Item 1</Text></Card>
          <Card><Text size="sm">Item 2</Text></Card>
          <Card><Text size="sm">Item 3</Text></Card>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">Medium Gap</Text>
        <Stack gap="md">
          <Card><Text size="sm">Item 1</Text></Card>
          <Card><Text size="sm">Item 2</Text></Card>
          <Card><Text size="sm">Item 3</Text></Card>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">Large Gap</Text>
        <Stack gap="lg">
          <Card><Text size="sm">Item 1</Text></Card>
          <Card><Text size="sm">Item 2</Text></Card>
          <Card><Text size="sm">Item 3</Text></Card>
        </Stack>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-8">
      <div>
        <Text variant="title" size="sm" className="mb-2">Start</Text>
        <Stack direction="row" align="start" gap="md" className="h-24 border border-gray-200 p-2">
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">Center</Text>
        <Stack direction="row" align="center" gap="md" className="h-24 border border-gray-200 p-2">
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">End</Text>
        <Stack direction="row" align="end" gap="md" className="h-24 border border-gray-200 p-2">
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
        </Stack>
      </div>
    </div>
  ),
};

export const Justification: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-8">
      <div>
        <Text variant="title" size="sm" className="mb-2">Start</Text>
        <Stack direction="row" justify="start" gap="md" className="border border-gray-200 p-2">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">Center</Text>
        <Stack direction="row" justify="center" gap="md" className="border border-gray-200 p-2">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">End</Text>
        <Stack direction="row" justify="end" gap="md" className="border border-gray-200 p-2">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Stack>
      </div>
      <div>
        <Text variant="title" size="sm" className="mb-2">Between</Text>
        <Stack direction="row" justify="between" gap="md" className="border border-gray-200 p-2">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Stack>
      </div>
    </div>
  ),
};
