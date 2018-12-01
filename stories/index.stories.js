/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

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

storiesOf("Post", module).add("Default", () => ({
  components: { PostAtom },
  template: `<PostAtom />`
}));

/* eslint-enable react/react-in-jsx-scope */
