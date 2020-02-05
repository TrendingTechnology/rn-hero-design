import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'rn-hero-design';

const CalendarScreen = () => (
  <View>
    <Calendar
      value={new Date('2020-02-01')}
      currentView={new Date('2020-02-01')}
    />
  </View>
);

export default CalendarScreen;
