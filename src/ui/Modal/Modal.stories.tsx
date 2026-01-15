import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Text } from '../Text';

const meta = {
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog component that overlays content on top of the page. Supports keyboard navigation (ESC to close) and click-outside-to-close functionality.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed in the modal header',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        {children}
      </Modal>
    </>
  );
};

export const WithoutTitle: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => (
    <ModalWrapper>
      <Text>This is a modal without a title.</Text>
      <Text variant="muted" size="sm">Click outside or press ESC to close.</Text>
    </ModalWrapper>
  ),
};

export const WithTitle: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => (
    <ModalWrapper title="Modal Title">
      <Text>This modal has a title in the header.</Text>
      <div className="mt-4">
        <Text variant="muted" size="sm">
          The header includes a close button (×) that you can click to close the modal.
        </Text>
      </div>
    </ModalWrapper>
  ),
};

export const WithContent: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => (
    <ModalWrapper title="Patient Details">
      <div className="space-y-4">
        <div>
          <Text variant="title" size="sm">Patient Information</Text>
          <Text>Name: John Doe</Text>
          <Text>Age: 45</Text>
          <Text>Status: Stable</Text>
        </div>
        <div className="border-t pt-4">
          <Text variant="title" size="sm">Medical History</Text>
          <Text variant="muted" size="sm">
            This section contains detailed medical history information.
          </Text>
        </div>
      </div>
    </ModalWrapper>
  ),
};

export const Controlled: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div className="space-x-2">
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close Modal</Button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title="Controlled Modal">
          <Text>This modal is controlled by external state.</Text>
          <div className="mt-4">
            <Button onClick={() => setOpen(false)}>Close from inside</Button>
          </div>
        </Modal>
      </>
    );
  },
};
