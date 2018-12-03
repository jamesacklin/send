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

import PostAtom from "../src/components/PostAtom";

function dateKnob(name, defaultValue) {
  const stringTimestamp = date(name, defaultValue);
  return new Date(stringTimestamp);
}

const postModeOpts = {
  Default: "default",
  Enhanced: "enhanced",
  Promotion: "promotion"
};

storiesOf("PostAtom", module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add("Default", () => ({
    components: { PostAtom },
    props: {
      postMode: {
        type: String,
        default: select("Post Mode", postModeOpts, "default")
      },
      pictureUrl: {
        type: String,
        default: text(
          "Picture URL",
          "https://dirtragmag.com/wp-content/uploads/pivot.jpg"
        )
      },
      titleCallout: {
        type: String,
        default: text("Title Callout", "")
      },
      title: {
        type: String,
        default: text(
          "Post Title",
          "Pivot Introduces New Mach 6 Family with Size-Specific Geometry"
        )
      },
      isMedia: {
        type: Boolean,
        default: boolean("Video Post", false)
      },
      isGallery: {
        type: Boolean,
        default: boolean("Photo Gallery Post", false)
      },
      isContest: {
        type: Boolean,
        default: boolean("Contest Post", false)
      },
      author: {
        type: String,
        default: text("Author", "Helena Kotala")
      },
      date: {
        type: Date,
        default: dateKnob("Date", new Date("Jan 20 2017"))
      },
      excerpt: {
        type: String,
        default: text(
          "Excerpt",
          "Pivot’s Mach 6 enduro/aggressive trail bike has been redesigned to be longer, lower and slacker, while keeping rider size in mind and tweaking the geometry on smaller bikes to better accommodate shorter riders while retaining the same ride characteristics as the larger sizes."
        )
      }
    },
    template: `<PostAtom
                  :mode="postMode"
                  :pictureUrl="pictureUrl"
                  :titleCallout="titleCallout"
                  :title="title"
                  :isMedia="isMedia"
                  :isGallery="isGallery"
                  :isContest="isContest"
                  :author="author"
                  :date="date"
                  :excerpt="excerpt" />`
  }))
  .add("Enhanced", () => ({
    components: { PostAtom },
    props: {
      postMode: {
        type: String,
        default: select("Post Mode", postModeOpts, "enhanced")
      },
      pictureUrl: {
        type: String,
        default: text(
          "Picture URL",
          "https://dirtragmag.com/wp-content/uploads/pivot.jpg"
        )
      },
      titleCallout: {
        type: String,
        default: text("Title Callout", "")
      },
      title: {
        type: String,
        default: text(
          "Post Title",
          "Pivot Introduces New Mach 6 Family with Size-Specific Geometry"
        )
      },
      isMedia: {
        type: Boolean,
        default: boolean("Video Post", false)
      },
      isGallery: {
        type: Boolean,
        default: boolean("Photo Gallery Post", false)
      },
      isContest: {
        type: Boolean,
        default: boolean("Contest Post", false)
      },
      author: {
        type: String,
        default: text("Author", "Helena Kotala")
      },
      date: {
        type: Date,
        default: dateKnob("Date", new Date("Jan 20 2017"))
      },
      excerpt: {
        type: String,
        default: text(
          "Excerpt",
          "Pivot’s Mach 6 enduro/aggressive trail bike has been redesigned to be longer, lower and slacker, while keeping rider size in mind and tweaking the geometry on smaller bikes to better accommodate shorter riders while retaining the same ride characteristics as the larger sizes."
        )
      }
    },
    template: `<PostAtom
                  :mode="postMode"
                  :pictureUrl="pictureUrl"
                  :titleCallout="titleCallout"
                  :title="title"
                  :isMedia="isMedia"
                  :isGallery="isGallery"
                  :isContest="isContest"
                  :author="author"
                  :date="date"
                  :excerpt="excerpt" />`
  }))
  .add("Promotion", () => ({
    components: { PostAtom },
    props: {
      postMode: {
        type: String,
        default: select("Post Mode", postModeOpts, "promotion")
      },
      pictureUrl: {
        type: String,
        default: text(
          "Picture URL",
          "https://dirtragmag.com/wp-content/uploads/pivot.jpg"
        )
      },
      titleCallout: {
        type: String,
        default: text("Title Callout", "")
      },
      title: {
        type: String,
        default: text(
          "Post Title",
          "Pivot Introduces New Mach 6 Family with Size-Specific Geometry"
        )
      },
      isMedia: {
        type: Boolean,
        default: boolean("Video Post", false)
      },
      isGallery: {
        type: Boolean,
        default: boolean("Photo Gallery Post", false)
      },
      isContest: {
        type: Boolean,
        default: boolean("Contest Post", false)
      },
      author: {
        type: String,
        default: text("Author", "")
      },
      date: {
        type: Date,
        default: dateKnob("Date", new Date("Jan 20 2017"))
      },
      excerpt: {
        type: String,
        default: text("Excerpt", "")
      }
    },
    template: `<PostAtom
                  :mode="postMode"
                  :pictureUrl="pictureUrl"
                  :titleCallout="titleCallout"
                  :title="title"
                  :isMedia="isMedia"
                  :isGallery="isGallery"
                  :isContest="isContest"
                  :author="author"
                  :date="date"
                  :excerpt="excerpt" />`
  }));
/* eslint-enable react/react-in-jsx-scope */
