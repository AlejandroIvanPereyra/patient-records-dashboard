import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

const meta = {
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A status badge component that displays patient status with color-coded styling. Used to quickly communicate the current state of a patient.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['stable', 'recovering', 'critical'],
      description: 'The status type',
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stable: Story = {
  args: {
    status: 'stable',
  },
};

export const Recovering: Story = {
  args: {
    status: 'recovering',
  },
};

export const Critical: Story = {
  args: {
    status: 'critical',
  },
};

export const AllStatuses: Story = {
  args: { status: 'stable' },
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <StatusBadge status="stable" />
        <span className="text-xs text-gray-500">Stable</span>
      </div>
      <div className="flex flex-col gap-2">
        <StatusBadge status="recovering" />
        <span className="text-xs text-gray-500">Recovering</span>
      </div>
      <div className="flex flex-col gap-2">
        <StatusBadge status="critical" />
        <span className="text-xs text-gray-500">Critical</span>
      </div>
    </div>
  ),
};
