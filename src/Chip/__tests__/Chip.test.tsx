import React from 'react';
import { Chip } from '../index';
import { renderWithTheme } from '../../../.ci/testHelper';
import { fireEvent } from '@testing-library/react-native';

describe('Chip Component', () => {
  // Test for solid and outline type
  it.each`
    type
    ${'solid'}
    ${'outline'}
  `('should render $type', ({ type }) => {
    const { queryByText } = renderWithTheme(<Chip title={type} type={type} />);
    expect(queryByText(type)).not.toBeNull();
  });

  it('should pass the onPress function when specified', () => {
    const handlePress = jest.fn();
    const { getByA11yRole } = renderWithTheme(<Chip onPress={handlePress} />);
    fireEvent(getByA11yRole('button'), 'press');
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
