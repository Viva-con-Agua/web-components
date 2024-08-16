import { defineCustomElement } from 'vue';
import copyButton from './components/CopyButton.ce.vue';
import linkButton from './components/LinkButton.ce.vue';

const copyButtonComponent = defineCustomElement(copyButton);
const linkButtonComponent = defineCustomElement(linkButton);

customElements.define('copy-button', copyButtonComponent);
customElements.define('link-button', linkButtonComponent);
