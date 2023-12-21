import { FC } from 'react';
import getCSSVariables from '../utils/getCSSVariables';
import docStyles from './TokenPreview.module.css';
import './Table.module.css';
import { capitalizeFirstLetter } from '../utils/functions';
import { TokenProps } from '../types/interfaces';

const Space: FC<{ variable: string; tokenValue: string }> = ({ variable, tokenValue }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>
      {tokenValue} ({`${Number(tokenValue.split('rem')[0]) * 16}px`})
    </td>
    <td>
      <div style={{ backgroundColor: '#0090ff', width: `${tokenValue}`, height: `${tokenValue}` }}></div>
    </td>
  </tr>
);

const Elevation: FC<{ variable: string; tokenValue: string }> = ({ variable, tokenValue }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>{tokenValue}</td>
    <td>
      <div
        style={{
          background: 'transparent',
          borderRadius: '3px',
          boxShadow: `${tokenValue}`,
          width: '4rem',
          height: '4rem',
        }}
      ></div>
    </td>
  </tr>
);

const BorderRadius: FC<{ variable: string; tokenValue: string }> = ({ variable, tokenValue }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>
      {tokenValue} {tokenValue.includes('rem') ? `(${Number(tokenValue.split('rem')[0]) * 16}px)` : ''}
    </td>
    <td>
      <div
        style={{
          backgroundColor: '#0090ff',
          borderRadius: `${tokenValue}`,
          width: tokenValue.includes('999px') ? '6rem' : '3rem',
          height: '3rem',
        }}
      ></div>
    </td>
  </tr>
);

const Transition: FC<{ variable: string; tokenValue: string }> = ({ variable, tokenValue }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>{tokenValue}</td>
    <td>
      <div
        className={`${docStyles['transition-demo']}`}
        style={{
          background: '#808080',
          borderRadius: '3px',
          boxShadow: `${tokenValue}`,
          position: 'relative',
          transitionDuration: `${tokenValue}`,
          width: '8rem',
          height: '2rem',
        }}
      ></div>
    </td>
  </tr>
);

const SwitchComponent: FC<{ variable: string; tokenValue: string; category: string }> = ({
  variable,
  tokenValue,
  category,
}) => {
  const components: { [category: string]: React.ReactNode } = {
    space: <Space variable={variable} tokenValue={tokenValue} />,
    elevation: <Elevation variable={variable} tokenValue={tokenValue} />,
    'border-radius': <BorderRadius variable={variable} tokenValue={tokenValue} />,
    transition: <Transition variable={variable} tokenValue={tokenValue} />,
    default: <></>,
  };
  const component = components[category] || components.default;
  return <>{component}</>;
};

const TokenPreview: FC<TokenProps> = ({ token }) => {
  const cssVariables = getCSSVariables(token);

  const generateGridItems = () => {
    const gridItems: JSX.Element[] = [];

    gridItems.push(
      <thead key="thead">
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>,
    );

    for (const [variable, tokenValue] of Object.entries(cssVariables)) {
      gridItems.push(
        <tbody key={variable}>
          <SwitchComponent variable={variable} tokenValue={tokenValue} category={token.category} />
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

export default TokenPreview;
