import { FC, useEffect, useState, useCallback } from 'react';
import { getCSSVariables } from '../../utils/getCSSVariables.js';
import { capitalizeFirstLetter } from '../../utils/functions.js';
import docStyles from './Colors.module.css';

const extractWordSeparatedByDash = /[a-zA-Z0-9]+/g;

const getTypeAndName = (variable: string): { type: string; name: string } => {
  const match = variable.match(extractWordSeparatedByDash);
  const startIndex = 2;
  const endIndex = match!.length - 1;
  const itemsBetweenFirstTwoAndLastWords = match!.slice(startIndex, endIndex);
  const type = itemsBetweenFirstTwoAndLastWords.join('-');
  const name = match![endIndex];
  return { type, name };
};

const getVarName = (extractValueFromVar: RegExpMatchArray | null) => {
  const match = extractValueFromVar![1].match(extractWordSeparatedByDash);
  const startIndex = 2;
  const endIndex = match!.length - 1;
  const itemsBetweenFirstTwoAndLast = match!.slice(startIndex, endIndex);
  const type = itemsBetweenFirstTwoAndLast.join('-');
  const name = match![endIndex];
  return `${type}-${name}`;
};

const getVarValue = (extractValueFromVar: RegExpMatchArray | null) => {
  return window.getComputedStyle(document.documentElement).getPropertyValue(extractValueFromVar![1]);
};

export const Colors: FC<Storybook.TokenProps> = ({ token }) => {
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(new URLSearchParams(window.location.search));

  const cssVariables = getCSSVariables(token, queryParams);

  const generateGridItems = useCallback(() => {
    const gridItems: JSX.Element[] = [];
    let currentType = '';

    for (const [variable, color] of Object.entries(cssVariables)) {
      const inlineStyle = { backgroundColor: color };
      const valueIsVar = /^var\(--[^)]+\)$/.test(color);
      const extractValueFromVar = color.match(/var\((.+)\)/);
      const { type, name } = getTypeAndName(variable);

      if (type !== currentType) {
        gridItems.push(
          <div key={`type-${type}`} className={`${docStyles['color-type-row']}`}>
            <h2 id={type}>{capitalizeFirstLetter(type)}</h2>
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
        <div key={variable} className={`${docStyles['color-grid-item']}`}>
          <div className={`${docStyles['color-preview']}`} style={inlineStyle}></div>
          <div className={`${docStyles['color-details']}`}>
            <div>
              <strong>{name}</strong>
            </div>
            <div>
              {valueIsVar ? (
                <small className={`${docStyles['color-alias']}`}>{getVarName(extractValueFromVar)}</small>
              ) : (
                <code>
                  <small>{color}</small>
                </code>
              )}
              <br />
              <code>
                <small>{valueIsVar ? getVarValue(extractValueFromVar) : ''}</small>
              </code>
            </div>
          </div>
        </div>,
      );
    }

    return gridItems;
  }, [cssVariables, token]);

  const referenceMarkup = () => {
    return (
      <>
        <h2 id="reference">Reference:</h2>
        <br />
        <div className={docStyles['color-reference']}>
          <div>
            Name: <strong>500</strong>
          </div>
          <br />
          <div>
            Alias: <small className={`${docStyles['color-alias']}`}>blue-500</small>
          </div>
          <br />
          <div>
            Value:{' '}
            <code>
              <small>#0090ff</small>
            </code>
          </div>
        </div>
        <br />
        <div>
          <strong>Note</strong>: Use the theme toggle in the storybook toolbar to see theme-specific colors
        </div>
      </>
    );
  };

  useEffect(() => {
    generateGridItems();
    const newQueryParams = new URLSearchParams(window.location.search);

    if (queryParams?.toString() !== newQueryParams.toString()) {
      setQueryParams(newQueryParams);
      generateGridItems();
    }
  }, [queryParams, generateGridItems]);

  return (
    <>
      <h1 id="colors">Colors</h1>
      <br />
      {referenceMarkup()}
      <br />
      <div className={`${docStyles['color-grid']}`}>{generateGridItems()}</div>
    </>
  );
};
