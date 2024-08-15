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

## Components

### CopyButton

Copies the value in `copy_value` to the clipboard.

```
        <!--
            label: Default button label.
            copy_label: Label after copy the copy_value.
            copy_value: Value what is copied.
            countdown: Seconds until the button resets. Default 5 sec.
            color: Button color, `orange`, `dark` and `default`
        -->
        <copy-button label="test" copy_label="Kopiert!" copy_value="blabla" countdown="5">
        </copy-button>
```
