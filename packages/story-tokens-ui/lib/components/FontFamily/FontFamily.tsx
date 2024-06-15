import React, { FC } from 'react';
import { getCSSVariables } from '../../utils/getCSSVariables.js';
import { capitalizeFirstLetter } from '../../utils/functions.js';
import docStyles from './FontFamily.module.css';
import type { Storybook } from '@localTypes/storybook.js';

const extractTypeAndName = (variable: string): { type: string; name: string } => {
  const extractWordSeparatedByDash = /[a-zA-Z0-9]+/g;
  const match = variable.match(extractWordSeparatedByDash);
  const startIndex = 3;
  const endIndex = match!.length - 1;
  const itemsBetweenFirstTwoAndLast = match!.slice(startIndex, endIndex);
  const type = itemsBetweenFirstTwoAndLast.join('-');
  const name = match![endIndex];
  return { type, name };
};

export const FontFamily: FC<Storybook.TokenProps> = ({ token, children }) => {
  const cssVariables = getCSSVariables(token);

  const generateGridItems = () => {
    const gridItems: JSX.Element[] = [];
    let currentType = '';

    for (const [variable, fontFamily] of Object.entries(cssVariables)) {
      const inlineStyle = { fontFamily: `${fontFamily}` };
      const { type, name } = extractTypeAndName(variable);

      if (type !== currentType) {
        gridItems.push(
          <div key={`type-${type}`}>
            <h3 id={type}>{capitalizeFirstLetter(type)}</h3>
            <p>
              <code>
                <strong>{`--${token.prefix}-${token.category}-${type}-{n}`}</strong>
              </code>
            </p>
          </div>,
        );
        currentType = type;
      }

      gridItems.push(
        <React.Fragment key={variable}>
          <hr />
          <div className={`${docStyles['font-family-grid']}`}>
            <div>
              <div>
                <strong>{name}</strong>
              </div>
              <div>
                <code>
                  <small>{fontFamily}</small>
                </code>
              </div>
            </div>
            <div style={inlineStyle}>{children}</div>
          </div>
          <br />
        </React.Fragment>,
      );
    }

    return gridItems;
  };

  return (
    <>
      <br />
      <h2>{capitalizeFirstLetter(token.category)}</h2>
      <br />
      <div>{generateGridItems()}</div>
    </>
  );
};
