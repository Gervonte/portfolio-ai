import { Loader } from '@mantine/core';

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        minHeight: '200px',
      }}
    >
      <Loader size="md" />
    </div>
  );
}
