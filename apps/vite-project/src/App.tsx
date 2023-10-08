import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import '@waldronmatt/demo-ui/styles/global.css';
import { Button } from '@waldronmatt/demo-ui/components/Button/index.js';
import { addition } from '@waldronmatt/basic-math/addition.js';
import { isEven } from '@waldronmatt/parity/even.js';
import './App.css';

function App() {
  const [countAddition, setAdditionCount] = useState(0);
  const [countParity, setParityCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
