import React from 'react';
import Calendar from '../Calendar.bs';
import { render, fireEvent } from '@testing-library/react-native';

describe('Calendar', () => {
  const minDate = new Date(2020, 0, 31);
  const maxDate = new Date(2020, 2, 20);
  const value = new Date(2020, 1, 1);

  describe('Snapshot', () => {
    it.each`
      element
      ${<Calendar minDate={minDate} maxDate={maxDate} value={value} currentView={new Date(2020, 0, 1)} />}
      ${<Calendar minDate={minDate} maxDate={maxDate} value={value} currentView={new Date(2020, 1, 1)} />}
      ${<Calendar minDate={minDate} maxDate={maxDate} value={value} currentView={new Date(2020, 2, 1)} />}
    `('renders correctly', ({ element }) => {
      const { baseElement } = render(element);
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('triggers onChange with the correct date', () => {
      const callback = jest.fn();
      const { getByText } = render(
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          currentView={new Date(2020, 1, 1)}
          onChange={callback}
        />,
      );

      const day24 = getByText('24');
      fireEvent.press(day24.parent);

      expect(callback).toBeCalledWith(new Date(2020, 1, 24));
    });
  });
});
