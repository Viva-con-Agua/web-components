import { defineCustomElement } from 'vue';
import copyButton from './components/CopyButton.vue';
import linkButton from './components/LinkButton.vue';
import formWrapper from './components/FormWrapper.vue';
const copyButtonComponent = defineCustomElement(copyButton);
const linkButtonComponent = defineCustomElement(linkButton);
const formWrapperComponent = defineCustomElement(formWrapper);

customElements.define('copy-button', copyButtonComponent);
customElements.define('link-button', linkButtonComponent);
customElements.define('form-wrapper', formWrapperComponent);
