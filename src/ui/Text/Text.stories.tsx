import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible text component with multiple variants, sizes, and semantic HTML element support. Use it for consistent typography throughout your application.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'title', 'link', 'muted'],
      description: 'The text variant style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The text size',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The HTML element to render',
    },
    color: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'The text color',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    children: 'This is body text with default styling.',
    variant: 'body',
    size: 'md',
  },
};

export const Title: Story = {
  args: {
    children: 'This is a title',
    variant: 'title',
    size: 'lg',
  },
};

export const Link: Story = {
  args: {
    children: 'This is a link',
    variant: 'link',
    size: 'md',
  },
};

export const Muted: Story = {
  args: {
    children: 'This is muted text',
    variant: 'muted',
    size: 'md',
  },
};

export const Sizes: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-2">
      <Text size="sm">Small text (sm)</Text>
      <Text size="md">Medium text (md)</Text>
      <Text size="lg">Large text (lg)</Text>
    </div>
  ),
};

export const SemanticElements: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-4">
      <Text as="h1" variant="title" size="lg">Heading 1</Text>
      <Text as="h2" variant="title" size="md">Heading 2</Text>
      <Text as="h3" variant="title" size="sm">Heading 3</Text>
      <Text as="p" variant="body">Paragraph text</Text>
      <Text as="span" variant="muted">Span text</Text>
    </div>
  ),
};

export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-4">
      <div>
        <Text variant="title" size="lg">Title Variant</Text>
        <Text variant="body">Body text follows the title.</Text>
      </div>
      <div>
        <Text variant="link">Clickable link text</Text>
      </div>
      <div>
        <Text variant="muted">Muted text for secondary information</Text>
      </div>
    </div>
  ),
};
