import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardContent } from './Card';
import { Text } from '../Text';
import { Button } from '../Button';

const meta = {
  component: Card,
  tags: ['autodocs'],
  subcomponents: { CardHeader, CardContent },
  parameters: {
    docs: {
      description: {
        component: 'A flexible card component with header and content sections. Perfect for displaying grouped content with consistent styling.',
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Card>
      <Text>This is a basic card with some content.</Text>
    </Card>
  ),
};

export const WithHeader: Story = {
  args: { children: null },
  render: () => (
    <Card>
      <CardHeader>
        <Text variant="title" size="lg">Card Title</Text>
        <Button variant="ghost" size="sm">Action</Button>
      </CardHeader>
      <CardContent>
        <Text>This card has a header with a title and action button.</Text>
      </CardContent>
    </Card>
  ),
};

export const Complex: Story = {
  args: { children: null },
  render: () => (
    <Card>
      <CardHeader>
        <div>
          <Text variant="title" size="lg">Patient Information</Text>
          <Text variant="muted" size="sm">Last updated: January 15, 2024</Text>
        </div>
        <Button variant="outline" size="sm">Edit</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Text><strong>Name:</strong> John Doe</Text>
          <Text><strong>Age:</strong> 45</Text>
          <Text><strong>Status:</strong> Stable</Text>
        </div>
      </CardContent>
    </Card>
  ),
};

export const Nested: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Text variant="title">Parent Card</Text>
        </CardHeader>
        <CardContent>
          <Card className="bg-gray-50">
            <CardContent>
              <Text size="sm">Nested card content</Text>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  ),
};
