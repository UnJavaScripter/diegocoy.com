class DCIcon extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const icon = document.createElement('span');
        
        const style = document.createElement('style');

        const iconName = this.getAttribute('icon');
        this.iconColor = this.getAttribute('icon-color') || '#000';

        icon.setAttribute('class', 'dc-icon-' + iconName);
        icon.setAttribute('aria-label', iconName + " logo");

        style.textContent = this.style();
        
        shadow.appendChild(style);
        shadow.appendChild(icon);

    }

    style () {
        return `
            :host(:hover) [class^="dc-icon-"] {
                color: ${this.iconColor};
                filter: grayscale(0);
            }
            [class^="dc-icon-"] {
                /* use !important to prevent issues with browser extensions that change fonts */
                font-family: 'icomoon' !important;
                speak: none;
                font-style: normal;
                font-weight: normal;
                font-variant: normal;
                text-transform: none;
                line-height: 1;
            
                /* Better Font Rendering =========== */
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;

                font-size: 5rem;

                color: #444;

                filter: grayscale(1);
                transition: filter 0.5s, color 0.4s;
            }
            
            .dc-icon-file-text2:before {
                content: "\\e926";
            }
            .dc-icon-location2:before {
                content: "\\e948";
            }
            .dc-icon-list:before {
                content: "\\e9ba";
            }
            .dc-icon-link:before {
                content: "\\e9cb";
            }
            .dc-icon-cross:before {
                content: "\\ea0f";
            }
            .dc-icon-share:before {
                content: "\\ea7d";
            }
            .dc-icon-embed2:before {
                content: "\\ea80";
            }
            .dc-icon-terminal:before {
                content: "\\ea81";
            }
            .dc-icon-mail:before {
                content: "\\ea83";
            }
            .dc-icon-facebook:before {
                content: "\\ea91";
            }
            .dc-icon-twitter:before {
                content: "\\ea96";
            }
            .dc-icon-youtube:before {
                content: "\\ea9d";
            }
            .dc-icon-github:before {
                content: "\\eab0";
            }
            .dc-icon-linkedin:before {
                content: "\\eac9";
            }
        `;
    }
  }

  customElements.define('dc-icon', DCIcon);