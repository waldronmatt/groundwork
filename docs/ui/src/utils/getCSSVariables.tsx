interface TokenName {
  prefix: string;
  category: string;
}

interface CSSVariables {
  [key: string]: string;
}

export const getCSSVariables = (token: TokenName, queryParams?: URLSearchParams | null): CSSVariables => {
  const variables: CSSVariables = {};
  const styleSheets = document.styleSheets;

  const themeParam = queryParams;
  // this is the name of the queryparam that is set via toolbar option toggling
  const themeGlobals = themeParam?.get('globals');
  const themeValue =
    themeGlobals
      // extract the storybook queryparams
      ?.split(';')
      ?.find((el) => el.includes('theme'))
      // extract 'theme' value
      ?.split(':')[1] || 'light';

  for (const sheet of styleSheets) {
    const rules = sheet.cssRules;

    if (rules) {
      for (const rule of rules) {
        if (
          rule instanceof CSSStyleRule &&
          (token.category !== 'color'
            ? rule.selectorText === ':root'
            : rule.selectorText === `:root[data-theme="${themeValue}"]` || rule.selectorText === ':root')
        ) {
          const styles = rule.style;
          for (const name of styles) {
            if (name.includes(token.category) && name.startsWith(`--${token.prefix}`)) {
              const value = styles.getPropertyValue(name);
              variables[name] = value;
            }
          }
        }
      }
    }
  }

  return variables;
};

export default getCSSVariables;
