//import type { Meta, StoryObj } from '@storybook/vue3';

//import CopyButton from '../components/CopyButton.vue';
import '../components/Button.scss';
import CopyButton from '../components/CopyButton.vue';

export default {
    title: 'Example/CopyButton',
    //components: { CopyButtonWrapper },
    //tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        copy_label: { control: 'text' },
        copy_value: { control: 'text' },
        color: {
            options: ['default', 'dark', 'orange'],
            control: {
                type: 'select',
            },
        },
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                transform: (src: string): string => {
                    // Hier wird der Source-Code angepasst, um den Kebab-Case-Tag zu verwenden
                    return src
                        .replace(/<CopyButton\s*\/>/g, '<copy-button></copy-button>') // Selbstschließendes Tag
                        .replace(/<CopyButton/g, '<copy-button') // Öffnendes Tag
                        .replace(/\/>/g, '></copy-button>') // Schließendes Tag

                        .replace(/<template>/g, '') // Entfernt <template>
                        .replace(/<\/template>/g, '') // Entfernt </template>
                        .replace(/<copy-button/g, '<copy-button') // Entfernt alle anderen Tags
                        .replace(/<\/copy-button>/g, '</copy-button>'); // Schließende Tags
                },
            },
        },
    },
};

const Template = (args) => ({
    components: { CopyButton },
    setup() {
        return { args };
    },
    template: '<copy-button v-bind="args" />', // Kebab-Case Tag verwenden
});

export const Default = Template.bind({});
Default.args = {
    label: 'Hello, World!',
    copy_label: 'Kopiet!',
    copy_value: 'das was ich kopiert habe',
    countdown: 5,
    color: 'default',
};
export const Dark = Template.bind({});
Dark.args = {
    label: 'Hello, World!',
    copy_label: 'Kopiet!',
    copy_value: 'das was ich kopiert habe',
    countdown: 5,
    color: 'dark',
};
export const Orange = Template.bind({});
Orange.args = {
    label: 'Hello, World!',
    copy_label: 'Kopiet!',
    copy_value: 'das was ich kopiert habe',
    countdown: 5,
    color: 'orange',
};
