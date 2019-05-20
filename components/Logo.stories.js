import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import Logo from './Logo'
storiesOf('Logo', module)
  .add('As a component', () => ({
    components: { Logo },
    template: '<Logo />'
  }))
  .add('I don\'t work', () => '<Logo />')
