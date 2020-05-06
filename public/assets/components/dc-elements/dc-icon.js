class DCIcon extends HTMLElement {
  constructor() {
    super();
    const iconContainer = document.createElement('div');
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const iconName = this.getAttribute('icon-name');
    const iconColor = this.getAttribute('icon-color');
    const template = document.getElementById(`icon-${iconName}`);
    const templateContent = template.content;
    const templateElement = templateContent.firstElementChild;
    const templateElementClone = template.content.cloneNode(true);
    templateElement.setAttribute('id', 's2');
    iconContainer.append(templateElementClone, templateElement);
    iconContainer.setAttribute('class', 'icon');
    iconContainer.setAttribute('tabindex', '0');
    style.textContent = `
      :host {
        width: 5.5rem;
        height: 5.5rem;
        text-align: initial;
        margin: auto;
      }
      :host(:hover) {
        cursor: pointer;
      }
      :host(:hover) #s2 {
        opacity: 1;
        clip-path: circle(120% at bottom);
        fill: ${iconColor};
      }
      .icon {
        position: relative;
      }
      svg {
        position: absolute;
        padding: 0.3rem;
        fill: #424246;
      }
      #s2 {
        opacity: 0;
        clip-path: circle(0% at bottom);
        transition: clip-path 2s,  opacity 2.5s;
      }`;
    shadow.appendChild(style);
    shadow.appendChild(iconContainer);
  }
}
customElements.define('dc-icon', DCIcon);
