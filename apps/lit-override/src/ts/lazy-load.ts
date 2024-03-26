document.getElementById('load-component')?.addEventListener('click', () => {
  // Dynamically import the web component
  import('./host-lazy-loaded').then(() => {
    // Once the component is loaded, you can create and add it to the DOM
    const container = document.getElementById('component-container');
    const component = document.createElement('host-app');
    component.innerHTML = `
      <lit-override>
        <h3 slot="heading">A heading from a template in the <em>light dom</em>!</h3>
        <p slot="content">A paragraph from a template in the <em>light dom</em>.</p>
        <template>
          <slot name="heading"></slot>
          <slot name="content"></slot>
        </template>
      </lit-override>
    `;
    container?.appendChild(component);
  });
});
