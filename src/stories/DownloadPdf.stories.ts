//import type { Meta, StoryObj } from '@storybook/vue3';

//import CopyButton from '../components/CopyButton.vue';
import '../components/DownloadContainer.scss';
import DownloadContainer from '../components/DownloadContainer.vue';
import '../components/DownloadPdf.scss';
import DownloadPdf from '../components/DownloadPdf.vue';

export default {
    title: 'Example/DownloadPDF',
    //components: { CopyButtonWrapper },
    //tags: ['autodocs'],
    argTypes: {
        displayImage: {
            control: 'text',
        },
        downloadLink: {
            control: 'text',
        },
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                transform: (src: string): string => {
                    // Hier wird der Source-Code angepasst, um den Kebab-Case-Tag zu verwenden
                    return src
                        .replace(/<DownloadPDF\s*\/>/g, '<download-pdf></download-pdf>') // Selbstschließendes Tag
                        .replace(/<DownloadPDF\s*\/>/g, '<download-pdf></download-pdf>') // Selbstschließendes Tag
                        .replace(/<DownloadPDF/g, '<download-pdf') // Öffnendes Tag
                        .replace(/\/>/g, '></download-pdf>') // Schließendes Tag
                        .replace(/<template>/g, '<download-container>') // Entfernt <template>
                        .replace(/<\/template>/g, '</download-container>') // Entfernt </template>
                        .replace(/<download-pdf/g, '<download-pdf') // Entfernt alle anderen Tags
                        .replace(/<\/download-pdf>/g, '</download-pdf>'); // Schließende Tags
                },
            },
        },
    },
};

const Template = (args) => ({
    components: { DownloadPdf, DownloadContainer },
    setup() {
        return { args };
    },
    template: '<download-container><download-pdf v-bind="args" /></download-container>', // Kebab-Case Tag verwenden
});

export const Default = Template.bind({});
Default.args = {
    displayImage:
        'https://www.vivaconagua.org/wp-content/uploads/2025/04/2025_VcA_move4WATER_Stempelkarte_DINA6_online.png',
    downloadLink:
        'https://www.vivaconagua.org/wp-content/uploads/2025/04/2025_VcA_move4WATER_Stempelkarte_DINA6_online.pdf',
};
