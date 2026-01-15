import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An avatar component that displays user profile images with fallback placeholder. Automatically handles image loading errors.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the avatar',
    },
    src: {
      control: 'text',
      description: 'The image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'User avatar',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'User avatar',
    size: 'lg',
  },
};

export const WithErrorFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'User avatar',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'When an image fails to load, the avatar automatically shows a placeholder icon.',
      },
    },
  },
};

export const AllSizes: Story = {
  args: { src: '', alt: '' },
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="Small" size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=2" alt="Medium" size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=3" alt="Large" size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};
