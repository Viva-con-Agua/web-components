//import type { Meta, StoryObj } from '@storybook/vue3';

//import CopyButton from '../components/CopyButton.vue';
import '../components/Button.scss';
import FormWrapper from '../components/FormWrapper.vue';

export default {
    title: 'Example/FormWrapper',
    //components: { CopyButtonWrapper },
    //tags: ['autodocs'],
    argTypes: {
        src: { control: 'text' },
        bordered: { control: 'boolean' },
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                transform: (src: string): string => {
                    // Hier wird der Source-Code angepasst, um den Kebab-Case-Tag zu verwenden
                    return src
                        .replace(/<FormWrapper\s*\/>/g, '<form-wrapper></form-wrapper>') // Selbstschließendes Tag
                        .replace(/<FormWrapper/g, '<form-wrapper') // Öffnendes Tag
                        .replace(/\/>/g, '></form-wrapper>') // Schließendes Tag

                        .replace(/<template>/g, '') // Entfernt <template>
                        .replace(/<\/template>/g, '') // Entfernt </template>
                        .replace(/<form-wrapper/g, '<form-wrapper') // Entfernt alle anderen Tags
                        .replace(/<\/form-wrapper>/g, '</form-wrapper>'); // Schließende Tags
                },
            },
        },
    },
};

const Template = (args) => ({
    components: { FormWrapper },
    setup() {
        return { args };
    },
    template: '<form-wrapper v-bind="args" />', // Kebab-Case Tag verwenden
});

export const Default = Template.bind({});
Default.args = {
    src: 'https://payment-form.dev.vivaconagua.org/donation-form?form_id=e6160169-5148-4ff3-8c12-127eb371a014',
    bordered: false,
};
