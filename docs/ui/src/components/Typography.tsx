import { FC } from 'react';
import { getCSSVariables } from './utils/getCSSVariables.js';
import { capitalizeFirstLetter } from './utils/functions.js';
import { TokenPropsInterface } from './types/tokenPropsInterface.js';
import docStyles from './styles/Typography.module.css';
import './styles/Table.module.css';

const FontSize: FC<{ variable: string; typography: string }> = ({ variable, typography }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>
      {typography} ({`${Number(typography.split('rem')[0]) * 16}px`})
    </td>
    <td className={docStyles['typography-demo']} style={{ fontSize: `${typography}` }}>
      Aa
    </td>
  </tr>
);

const FontWeight: FC<{ variable: string; typography: string }> = ({ variable, typography }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>{typography}</td>
    <td className={docStyles['typography-demo']} style={{ fontWeight: `${typography}` }}>
      The quick brown fox jumped over the lazy dog.
    </td>
  </tr>
);

const LetterSpacing: FC<{ variable: string; typography: string }> = ({ variable, typography }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>{typography}</td>
    <td className={docStyles['typography-demo']} style={{ letterSpacing: `${typography}` }}>
      The quick brown fox jumped over the lazy dog.
    </td>
  </tr>
);

const LineHeight: FC<{ variable: string; typography: string }> = ({ variable, typography }) => (
  <tr>
    <td>
      <code>{variable}</code>
    </td>
    <td>{typography}</td>
    <td className={docStyles['typography-demo']} style={{ lineHeight: `${typography}` }}>
      The quick brown fox jumped over the lazy dog.
      <br />
      The quick brown fox jumped over the lazy dog.
      <br />
      The quick brown fox jumped over the lazy dog.
    </td>
  </tr>
);

const SwitchComponent: FC<{ variable: string; typography: string; category: string }> = ({
  variable,
  typography,
  category,
}) => {
  const components: { [category: string]: React.ReactNode } = {
    'font-size': <FontSize variable={variable} typography={typography} />,
    'font-weight': <FontWeight variable={variable} typography={typography} />,
    'letter-spacing': <LetterSpacing variable={variable} typography={typography} />,
    'line-height': <LineHeight variable={variable} typography={typography} />,
    default: <></>,
  };
  const component = components[category] || components.default;
  return <>{component}</>;
};

const Typography: FC<TokenPropsInterface> = ({ token }) => {
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

    for (const [variable, typography] of Object.entries(cssVariables)) {
      gridItems.push(
        <tbody key={variable}>
          <SwitchComponent variable={variable} typography={typography} category={token.category} />
        </tbody>,
      );
    }

    return gridItems;
  };

  return (
    <>
      <br />
      <h2 id={token.category}>{capitalizeFirstLetter(token.category)}</h2>
      <div className={`${docStyles['table-scroll']}`}>
        <table>{generateGridItems()}</table>
      </div>
    </>
  );
};

export default Typography;
