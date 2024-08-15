import { defineCustomElement } from 'vue';
import copyButton from './components/CopyButton.ce.vue';

const copyButtonComponent = defineCustomElement(copyButton);

customElements.define('copy-button', copyButtonComponent);
