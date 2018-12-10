/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, array } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";

import Ticker from "../components/Ticker";

storiesOf("Ticker", module)
  .addDecorator(withKnobs)
  .add("Ticker", () => ({
    components: { Ticker },
    props: {
      tickerStories: {
        type: Array,
        default: array("Ticker Stories", [
          {
            title: "Pivot to return as 2019 DirtFest Sponsor",
            link: "https://www.google.com/"
          },
          {
            title: "Snow Bike Festival is Back",
            link: "https://www.google.com/"
          },
          {
            title: "Canyon releases the new Neuron",
            link: "https://www.google.com"
          },
          {
            title: "Hark! Dirt Rag Issue 208 is on its way!",
            link: "https://www.google.com"
          },
          {
            title: "Remember to shred the vote November 6th",
            link: "https://www.google.com"
          }
        ])
      }
    },
    template: `<Ticker :tickerStories="tickerStories" />`
  }));

/* eslint-enable react/react-in-jsx-scope */
