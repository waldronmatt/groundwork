import { html, css } from 'lit';

export const customStyles = css`
  :host {
    display: block;
    border: 2px solid #000000;
    margin-top: 1rem;
  }

  ::slotted([slot='heading']) {
    text-decoration: underline;
    color: #0000ff;
  }

  ::slotted([slot='sub-heading']) {
    color: #ff0000;
  }
`;

export const customMarkup = () => {
  const message = 'Hello world';
  return html`
    <p>Templating support from lit-html: ${message}!</p>
    <slot name="heading"></slot>
    <slot name="sub-heading"></slot>
  `;
};
