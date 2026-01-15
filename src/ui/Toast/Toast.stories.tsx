import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toast, type ToastType } from './Toast';
import { Button } from '../Button';

const meta = {
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A toast notification component that displays temporary messages. Automatically dismisses after a specified duration. Includes a close button for manual dismissal. Renders as a portal to avoid z-index issues.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info'],
      description: 'The type of toast notification',
    },
    message: {
      control: 'text',
      description: 'The message to display',
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-dismiss',
    },
    onClose: {
      description: 'Callback function called when toast is closed (via close button or auto-dismiss)',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastWrapper = ({ type, message, duration }: { type: ToastType; message: string; duration?: number }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Show {type} Toast</Button>
      {show && (
        <Toast
          type={type}
          message={message}
          duration={duration}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
};

export const Success: Story = {
  args: { type: 'success', message: '', onClose: () => { } },
  render: () => <ToastWrapper type="success" message="Operation completed successfully!" />,
};

export const Error: Story = {
  args: { type: 'error', message: '', onClose: () => { } },
  render: () => <ToastWrapper type="error" message="An error occurred. Please try again." />,
};

export const Info: Story = {
  args: { type: 'info', message: '', onClose: () => { } },
  render: () => <ToastWrapper type="info" message="Here's some helpful information." />,
};

export const CustomDuration: Story = {
  args: { type: 'info', message: '', onClose: () => { } },
  render: () => (
    <ToastWrapper
      type="info"
      message="This toast will stay for 5 seconds"
      duration={5000}
    />
  ),
};

export const AllTypes: Story = {
  args: { type: 'success', message: '', onClose: () => { } },
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: number; type: ToastType; message: string }>>([]);
    let idCounter = 0;

    const showToast = (type: ToastType, message: string) => {
      const id = idCounter++;
      setToasts(prev => [...prev, { id, type, message }]);
    };

    const removeToast = (id: number) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
      <div className="space-x-2">
        <Button onClick={() => showToast('success', 'Success message!')}>Success</Button>
        <Button onClick={() => showToast('error', 'Error message!')}>Error</Button>
        <Button onClick={() => showToast('info', 'Info message!')}>Info</Button>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    );
  },
};
