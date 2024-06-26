import { FC } from 'react';
import { getCSSVariables } from '../../utils/getCSSVariables.js';
import { capitalizeFirstLetter } from '../../utils/functions.js';
import docStyles from './TokenBasic.module.css';
import '../../styles/Table.module.css';
import type { Storybook } from '@localTypes/storybook.js';

export const TokenBasic: FC<Storybook.TokenProps> = ({ token }) => {
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
