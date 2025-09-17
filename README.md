# Viva con Agua web components

Contains various web components that are used on the Viva con Agua website.

## Initial

The components only need to be installed in the head of the page. They can then be used on the entire page.

```
    <head>
      ...
      <script type="module" crossorigin src="https://components.vivaconagua.org/assets/index.js"></script>
      ...
    </head>
```

## Components

You can find a documentary about the elements in the [storybook](https://storybook-components.vivaconagua.org/?path=/docs/example-linkbutton--docs).

## Develop

First create a normal component under `src/components`. The file should have the extension `.ce.vue`. Then the components must be defined in `src/main.ts` as `customElement`.

```
import copyButton from './components/CopyButton.ce.vue';
const copyButtonComponent = defineCustomElement(copyButton);

customElements.define('copy-button', copyButtonComponent);
```

You can run a Docker to run the components in your localhost.

```
docker compose up -d --build
```

The service can be reached at [http://localhost:8020](http://localhost:8020) and can be integrated with:

```
 <script type="module" src="http://localhost:8020/assets/index.js"></script>
```

## Storybook

In order for the sample code to be displayed correctly in the storybook, the name of the tags must be adjusted. The following example is from the `<link-button>`

```
export default {
    title: 'Example/LinkButton',
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
```
