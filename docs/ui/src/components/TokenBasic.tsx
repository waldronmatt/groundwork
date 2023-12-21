import { FC } from 'react';
import getCSSVariables from '../utils/getCSSVariables';
import docStyles from './TokenBasic.module.css';
import './Table.module.css';
import { capitalizeFirstLetter } from '../utils/functions';
import { TokenProps } from '../types/interfaces';

const TokenBasic: FC<TokenProps> = ({ token }) => {
  const cssVariables = getCSSVariables(token);

  const generateGridItems = () => {
    const gridItems: JSX.Element[] = [];

    gridItems.push(
      <thead key="thead">
        <tr>
          <th>Token</th>
          <th>Value</th>
        </tr>
      </thead>,
    );

    for (const [variable, tokenValue] of Object.entries(cssVariables)) {
      gridItems.push(
        <tbody key={variable}>
          <tr>
            <td>
              <code>{variable}</code>
            </td>
            <td>{tokenValue}</td>
          </tr>
        </tbody>,
      );
    }

    return gridItems;
  };

  return (
    <>
      <h1 id={token.category}>{capitalizeFirstLetter(token.category)}</h1>
      <div className={`${docStyles['table-scroll']}`}>
        <table>{generateGridItems()}</table>
      </div>
    </>
  );
};

export default TokenBasic;
