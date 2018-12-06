/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import {
  withKnobs,
  text,
  boolean,
  number,
  object,
  date,
  select
} from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";

import NavItem from "../src/components/Navigation/NavItem.vue";
import NavDrawer from "../src/components/Navigation/NavDrawer.vue";

storiesOf("Navigation", module)
  .addDecorator(withKnobs)
  .add("Navigation Item", () => ({
    components: { NavItem },
    props: {
      item: {
        type: Object,
        default: object("Navigation Item", {
          name: "Industry News",
          link: "/news"
        })
      }
    },
    template: `<NavItem :item="item" />`
  }))
  .add("Navigation Drawer", () => ({
    components: { NavDrawer },
    props: {},
    template: `<NavDrawer />`
  }));

/* eslint-enable react/react-in-jsx-scope */
