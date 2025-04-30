import { defineCustomElement } from 'vue';
import copyButton from './components/CopyButton.vue';
import downloadContainer from './components/DownloadContainer.vue';
import downloadPDF from './components/DownloadPDF.vue';
import formWrapper from './components/FormWrapper.vue';
import linkButton from './components/LinkButton.vue';

const copyButtonComponent = defineCustomElement(copyButton);
const linkButtonComponent = defineCustomElement(linkButton);
const formWrapperComponent = defineCustomElement(formWrapper);
const downloadPDFComponent = defineCustomElement(downloadPDF);
const downloadContainerComponent = defineCustomElement(downloadContainer);

customElements.define('copy-button', copyButtonComponent);
customElements.define('link-button', linkButtonComponent);
customElements.define('form-wrapper', formWrapperComponent);
customElements.define('download-pdf', downloadPDFComponent);
customElements.define('download-container', downloadContainerComponent);
