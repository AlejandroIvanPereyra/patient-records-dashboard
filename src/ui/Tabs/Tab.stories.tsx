import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs } from './Tab';
import { Card } from '../Card';
import { Text } from '../Text';

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tabs component for switching between different views or sections. Supports custom labels and controlled state.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['tab1', 'tab2', 'tab3'],
      description: 'The currently selected tab value',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabsWrapper = () => {
  const [value, setValue] = useState<'overview' | 'details' | 'history'>('overview');
  
  return (
    <div className="space-y-4">
      <Tabs
        value={value}
        onChange={setValue}
        options={[
          { value: 'overview', label: 'Overview' },
          { value: 'details', label: 'Details' },
          { value: 'history', label: 'History' },
        ]}
      />
      <Card>
        {value === 'overview' && <Text>Overview content goes here</Text>}
        {value === 'details' && <Text>Details content goes here</Text>}
        {value === 'history' && <Text>History content goes here</Text>}
      </Card>
    </div>
  );
};

export const Default: Story = {
  args: { value: 'overview', options: [], onChange: () => {} },
  render: () => <TabsWrapper />,
};

export const WithCustomLabels: Story = {
  args: { value: 'patients', options: [], onChange: () => {} },
  render: () => {
    const [value, setValue] = useState<'patients' | 'appointments' | 'reports'>('patients');
    
    return (
      <div className="space-y-4">
        <Tabs
          value={value}
          onChange={setValue}
          options={[
            { value: 'patients', label: '👥 Patients' },
            { value: 'appointments', label: '📅 Appointments' },
            { value: 'reports', label: '📊 Reports' },
          ]}
        />
        <Card>
          <Text>Selected: {value}</Text>
        </Card>
      </div>
    );
  },
};

export const TwoTabs: Story = {
  args: { value: 'active', options: [], onChange: () => {} },
  render: () => {
    const [value, setValue] = useState<'active' | 'archived'>('active');
    
    return (
      <div className="space-y-4">
        <Tabs
          value={value}
          onChange={setValue}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'archived', label: 'Archived' },
          ]}
        />
        <Card>
          <Text>Showing {value} items</Text>
        </Card>
      </div>
    );
  },
};

export const ManyTabs: Story = {
  args: { value: 'tab1', options: [], onChange: () => {} },
  render: () => {
    const [value, setValue] = useState<'tab1' | 'tab2' | 'tab3' | 'tab4' | 'tab5'>('tab1');
    
    return (
      <div className="space-y-4">
        <Tabs
          value={value}
          onChange={setValue}
          options={[
            { value: 'tab1', label: 'Tab 1' },
            { value: 'tab2', label: 'Tab 2' },
            { value: 'tab3', label: 'Tab 3' },
            { value: 'tab4', label: 'Tab 4' },
            { value: 'tab5', label: 'Tab 5' },
          ]}
        />
        <Card>
          <Text>Content for {value}</Text>
        </Card>
      </div>
    );
  },
};
