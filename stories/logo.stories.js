/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import {
  withKnobs,
  text,
  boolean,
  number,
  date,
  select
} from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";

import Logo from "../src/components/Logo.vue";

storiesOf("Logo", module)
  .addDecorator(withKnobs)
  .add("Vertical (Default)", () => ({
    components: { Logo },
    props: {
      bgColor: {
        type: Text,
        default: text("Background Color", "transparent")
      }
    },
    template: `<Logo :bgColor="bgColor" orientation="vertical" />`
  }))
  .add("Horizontal", () => ({
    components: { Logo },
    props: {
      bgColor: {
        type: Text,
        default: text("Background Color", "transparent")
      }
    },
    template: `<Logo :bgColor="bgColor" orientation="horizontal" />`
  }));

/* eslint-enable react/react-in-jsx-scope */
