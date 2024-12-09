import type { Preview, Parameters } from '@storybook/vue3';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    tags: ['autodocs', 'autodocs'],
};

export const parameters: Parameters = {
    docs: {
        transformSource: (src: string) => {
            // Wandelt den Komponentennamen in kebab-case um
            return src.replace(/<([A-Z][a-zA-Z]+)\b/g, (_, componentName: string) => {
                const kebabName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                console.log('Converted:', kebabName);
                return `<${kebabName}`;
            });
        },
    },
};

export default preview;
