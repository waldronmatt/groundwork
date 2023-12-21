import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// demo-ui css reset file
import '@waldronmatt/demo-ui/lib/styles/reset.css';
// demo-ui global css variable tokens
import '@waldronmatt/demo-ui/lib/styles/global.css';
import { Button, Link } from '@waldronmatt/demo-ui/lib/index.js';
import { addition } from '@waldronmatt/basic-math/src/index.js';
import { isEven } from '@waldronmatt/parity/src/index.js';
// app-specific styles
import './App.css';

function App() {
  const [countAddition, setAdditionCount] = useState(0);
  const [countParity, setParityCount] = useState(0);

  document.firstElementChild?.setAttribute('data-theme', 'light');

  return (
    <>
      <div>
        <Link href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
        <Link href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Link>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setAdditionCount((thiscountAddition) => thiscountAddition + 1)}>
          {countAddition} + {countAddition} = {addition(countAddition, countAddition)}
        </Button>
      </div>
      <div className="card">
        <Button onClick={() => setParityCount((thisCountParity) => thisCountParity + 1)}>
          Is {countParity} even? {isEven(countParity) ? 'True' : 'False'}
        </Button>
      </div>
    </>
  );
}

export default App;
