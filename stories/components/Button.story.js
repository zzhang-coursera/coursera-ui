import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import {Button} from '../../';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
