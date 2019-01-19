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

import SectionHeader from "../components/SectionHeader.vue";

storiesOf("Section Header", module)
  .addDecorator(withKnobs)
  .add("Header", () => ({
    components: { SectionHeader },
    template: `<SectionHeader />`
  }));

/* eslint-enable react/react-in-jsx-scope */
