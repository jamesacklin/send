import { configure, addDecorator } from '@storybook/vue'
import '../static/global.css'

import Vue from 'vue';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
