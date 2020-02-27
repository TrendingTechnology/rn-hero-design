import React from 'react';
import Calendar from '../Calendar.bs';
import { render } from '@testing-library/react-native';

describe('Calendar', () => {
  describe('Snapshot', () => {
    const minDate = new Date(2020, 0, 31);
    const maxDate = new Date(2020, 2, 20);
    const value = new Date(2020, 1, 1);

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
});
