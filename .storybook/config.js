import { configure, addDecorator } from "@storybook/vue";

// Decorator to center-align all stories
addDecorator(() => ({
  template:
    '<div style="padding: 3rem; display: flex; flex-direction: column; align-items: center" ><story/></div>'
}));

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
