import React from 'react';

export default function Navbar() {
  return (
    <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>MyProject</div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}
