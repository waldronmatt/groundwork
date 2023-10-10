import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// we use `lib/` and `src/` paths so we can get source files and have storybook/vite
// auto refresh (hmr) whenever we update our packages source files
import '@waldronmatt/demo-ui/lib/styles/global.css';
import { Button } from '@waldronmatt/demo-ui/lib/components/Button/index.js';
// there is an issue using `pnpm stub` with this project
// see https://github.com/unjs/jiti/issues/136
import { addition } from '@waldronmatt/basic-math/src/addition.js';
import { isEven } from '@waldronmatt/parity/src/even.js';
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
