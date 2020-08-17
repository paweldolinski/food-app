

import React from 'react';
import Logo from '../components/logo/Logo';
import renderer from 'react-test-renderer';

it('logo renders correctly', () => {
  const tree = renderer
    .create(<Logo />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});














