document.getElementById('load-component')?.addEventListener('click', () => {
  // Dynamically import the web component
  import('./lazy-loaded').then(() => {
    // Once the component is loaded, you can create and add it to the DOM
    const container = document.getElementById('component-container');
    const component = document.createElement('host-app');
    component.innerHTML = `
      <child-component templateId="childTemplate">
        <h3 slot="heading">A heading from a template in the <em>light dom</em>!</h3>
        <p slot="sub-heading">A paragraph from a template in the <em>light dom</em>.</p>
      </child-component>
      <lit-override templateId="childTemplate">
        <h3 slot="heading">A heading from a template in the <em>light dom</em>!</h3>
        <p slot="sub-heading">A paragraph from a template in the <em>light dom</em>.</p>
      </lit-override>
    `;
    container?.appendChild(component);
  });
});
