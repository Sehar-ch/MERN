import React from 'react';

function App() {
  const handleClick = () => {
    alert('Button clicked! Welcome to Day 1 of MERN.');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to My MERN Internship</h1>
      <p>This is Day 1 — Basic React setup.</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;