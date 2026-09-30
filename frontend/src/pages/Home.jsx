import React, { useState } from 'react';
import Button from '../components/common/Button';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Welcome to React + Vite</h1>
      <p style={{ color: '#64748b' }}>Project frontend siap dikembangkan dan dikoneksikan ke Express backend.</p>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Button onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </Button>
      </div>
    </main>
  );
}
