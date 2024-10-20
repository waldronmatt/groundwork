import { html, css } from 'lit';

export const customStyles = css`
  ::slotted([slot='heading']) {
    text-decoration: underline;
  }
`;

export const customMarkup = () => {
  return html`<slot name="heading"></slot>`;
};
