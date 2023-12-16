// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';

interface ColorGridProps {
  prefix: string;
}

interface CSSVariables {
  [key: string]: string;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ColorGrid: FC<ColorGridProps> = ({ prefix }) => {
  const getCSSVariables = (): CSSVariables => {
    const variables: CSSVariables = {};
    const styleSheets = document.styleSheets;

    for (const sheet of styleSheets) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const rules = (sheet as CSSStyleSheet).cssRules;

      if (rules) {
        for (const rule of rules) {
          if (rule instanceof CSSStyleRule) {
            const styles = rule.style;
            for (const name of styles) {
              const value = styles.getPropertyValue(name);
              variables[name] = value;
            }
          }
        }
      }
    }

    return variables;
  };

  const cssVariables = getCSSVariables();

  const generateGridItems = (): JSX.Element[] => {
    const gridItems: JSX.Element[] = [];

    let currentCategory = '';

    for (const [variable, color] of Object.entries(cssVariables)) {
      const category = variable.split('-')[4]?.toLowerCase() || '';
      const name = variable.split('-')[5]?.toLowerCase() || '';
      const inlineStyle = { backgroundColor: color };

      // Filter variables that contain the word "color" and have the specified prefix
      if (!variable.toLowerCase().includes('color') || !variable.startsWith(`--${prefix}`)) {
        continue;
      }

      // Check if the category has changed, and insert a new row if necessary
      if (category !== currentCategory) {
        gridItems.push(
          <div key={`category-${category}`} className="color-category-row">
            <h2 id={category}>{capitalizeFirstLetter(category)}</h2>
            <p>
              <code>
                <strong>{`--${prefix}-color-${category}-{n}`}</strong>
              </code>
            </p>
          </div>,
        );
        currentCategory = category;
      }

      gridItems.push(
        <div key={variable} className="color-grid-item">
          <div className="color-preview" style={inlineStyle}></div>
          <div className="color-details">
            <div className="variable-name">
              <strong>{name}</strong>
            </div>
            <div className="variable-color">
              <code>
                <small>{color}</small>
              </code>
            </div>
          </div>
        </div>,
      );
    }

    return gridItems;
  };

  return <div className="color-grid">{generateGridItems()}</div>;
};

export default ColorGrid;
