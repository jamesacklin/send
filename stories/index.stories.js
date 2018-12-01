/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import HelloWorld from "../src/components/HelloWorld";
import PostAtom from "../src/components/PostAtom";

storiesOf("Hello World", module)
  .add("Default", () => ({
    components: { HelloWorld },
    template: `<HelloWorld />`
  }))
  .add("Custom Message", () => ({
    components: { HelloWorld },
    template: `<HelloWorld msg="Welcome to Your Vue.js App"/>`
  }));

storiesOf("Post", module)
  .addDecorator(withKnobs)
  .add("Default", () => ({
    components: { PostAtom },
    props: {
      titleCallout: {
        type: String,
        default: text("Title Callout", "Title Callout") // The first param is the display name, the second is the default value.
      }
    },
    template: `<PostAtom :titleCallout="titleCallout" />`
  }));

/* eslint-enable react/react-in-jsx-scope */
