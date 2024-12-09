//import type { Meta, StoryObj } from '@storybook/vue3';

//import CopyButton from '../components/CopyButton.vue';
import '../components/Button.scss';
import LinkButton from '../components/LinkButton.vue';

export default {
    title: 'Example/LinkButton',
    //components: { CopyButtonWrapper },
    //tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        to: { control: 'text' },
        utm_source: { control: 'text' },
        utm_medium: { control: 'text' },
        utm_campaign: { control: 'text' },
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
                        .replace(/<LinkButton\s*\/>/g, '<link-button></link-button>') // Selbstschließendes Tag
                        .replace(/<LinkButton\s*\/>/g, '<link-button></link-button>') // Selbstschließendes Tag
                        .replace(/<LinkButton/g, '<link-button') // Öffnendes Tag
                        .replace(/\/>/g, '></link-button>') // Schließendes Tag
                        .replace(/<template>/g, '') // Entfernt <template>
                        .replace(/<\/template>/g, '') // Entfernt </template>
                        .replace(/<link-button/g, '<link-button') // Entfernt alle anderen Tags
                        .replace(/<\/link-button>/g, '</link-button>'); // Schließende Tags
                },
            },
        },
    },
};

const Template = (args) => ({
    components: { LinkButton },
    setup() {
        return { args };
    },
    template: '<link-button v-bind="args" />', // Kebab-Case Tag verwenden
});

export const Default = Template.bind({});
Default.args = {
    label: 'Click Me!',
    to: 'https://vivaconagua.org',
    utm_source: 'click-me',
    utm_medium: 'desktop',
    utm_campaign: 'storybook',
    color: 'default',
};
export const Dark = Template.bind({});
Dark.args = {
    label: 'Click Me!',
    to: 'https://vivaconagua.org',
    utm_source: 'click-me',
    utm_medium: 'desktop',
    utm_campaign: 'storybook',
    color: 'dark',
};
export const Orange = Template.bind({});
Orange.args = {
    label: 'Click Me!',
    to: 'https://vivaconagua.org',
    utm_source: 'click-me',
    utm_medium: 'desktop',
    utm_campaign: 'storybook',
    color: 'orange',
};
