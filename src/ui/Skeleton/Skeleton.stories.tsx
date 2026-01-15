import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A skeleton loader component that displays placeholder content while data is loading. Supports different sizes, border radius, and animation variants.',
      },
    },
  },
  argTypes: {
    width: {
      control: 'text',
      description: 'CSS width class (e.g., "w-full", "w-32")',
    },
    height: {
      control: 'text',
      description: 'CSS height class (e.g., "h-4", "h-8")',
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Border radius size',
    },
    variant: {
      control: 'select',
      options: ['shimmer', 'pulse'],
      description: 'Animation variant',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 'w-full',
    height: 'h-4',
    radius: 'md',
    variant: 'pulse',
  },
};

export const Pulse: Story = {
  args: {
    width: 'w-full',
    height: 'h-4',
    variant: 'pulse',
  },
};

export const Shimmer: Story = {
  args: {
    width: 'w-full',
    height: 'h-4',
    variant: 'shimmer',
  },
};

export const DifferentSizes: Story = {
  args: {},
  render: () => (
    <div className="space-y-4 w-64">
      <Skeleton width="w-full" height="h-4" />
      <Skeleton width="w-3/4" height="h-4" />
      <Skeleton width="w-1/2" height="h-4" />
      <Skeleton width="w-full" height="h-8" />
      <Skeleton width="w-full" height="h-12" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  args: {},
  render: () => (
    <div className="w-64 space-y-3 p-4 border rounded-lg">
      <Skeleton width="w-full" height="h-6" radius="lg" />
      <Skeleton width="w-full" height="h-4" />
      <Skeleton width="w-2/3" height="h-4" />
      <Skeleton width="w-full" height="h-20" radius="md" />
    </div>
  ),
};

export const RadiusVariants: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <div>
        <Skeleton width="w-32" height="h-8" radius="sm" />
        <span className="text-xs text-gray-500 ml-2">Small radius</span>
      </div>
      <div>
        <Skeleton width="w-32" height="h-8" radius="md" />
        <span className="text-xs text-gray-500 ml-2">Medium radius</span>
      </div>
      <div>
        <Skeleton width="w-32" height="h-8" radius="lg" />
        <span className="text-xs text-gray-500 ml-2">Large radius</span>
      </div>
    </div>
  ),
};
