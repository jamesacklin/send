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

import Vue from "vue";
import DoubleClick from "vue-doubleclick";
import OutsideFeed from "../src/components/OutsideFeed";
import Advertising from "../src/components/Advertising";

let mappings = {
  banner: [
    {
      window: [0, 0],
      sizes: [[300, 100], [320, 50], [728, 90], [970, 90], [970, 415]]
    }
  ],
  rectangle: [
    { window: [0, 0], sizes: [[300, 100], [300, 250], [300, 300], [300, 600]] }
  ]
};

Vue.use(DoubleClick, {
  id: "28844187",
  mappings
});

storiesOf("Advertising", module)
  .addDecorator(withKnobs)
  .add("Outside Video Feed", () => ({
    components: { OutsideFeed },
    template: `<div style="width: 600px"><OutsideFeed /></div>`
  }))
  .add("DR_300x250_Square1", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square1"
                size="rectangle" />`
  }))
  .add("DR_300x250_Square2", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square2"
                size="rectangle" />`
  }))
  .add("DR_300x250_Square3", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square3"
                size="rectangle" />`
  }))
  .add("DR_300x250_Square4", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square4"
                size="rectangle" />`
  }))
  .add("DR_300x250_Square5", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square5"
                size="rectangle" />`
  }))
  .add("DR_300x250_Square6", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square6"
                size="rectangle" />`
  }))
  .add("DR_300x250_Square7", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square7"
                size="rectangle" />`
  }))
  .add("DR_300x250_Square8", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_Square8"
                size="rectangle" />`
  }))
  .add("DR_300x250_SquareNine", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_SquareNine"
                size="rectangle" />`
  }))
  .add("DR_300x250_SquareTen", () => ({
    components: { Advertising },
    template: `<Advertising
                ref="adStory"
                unit="DR_300x250_SquareTen"
                size="rectangle" />`
  }));

/* eslint-enable react/react-in-jsx-scope */
