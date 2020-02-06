import React from 'react';
import {
  Calendar,
  DateTimePicker,
  Container,
  injectTheme,
} from 'rn-hero-design';

const CalendarScreen = ({ theme }) => {
  const [value, setValue] = React.useState(new Date('2020-02-01'));
  const [currentView, setCurrentView] = React.useState(new Date('2020-02-01'));
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <>
      <Container fluid>
        <Calendar
          value={value}
          currentView={currentView}
          onChange={date => {
            setValue(date);
            setCurrentView(date);
          }}
          onPressPrev={() => {
            const newDate = new Date(currentView.getTime());
            newDate.setMonth(currentView.getMonth() - 1);
            setCurrentView(newDate);
          }}
          onPressNext={() => {
            const newDate = new Date(currentView.getTime());
            newDate.setMonth(currentView.getMonth() + 1);
            setCurrentView(newDate);
          }}
          onPressTitle={() => setShowDatePicker(true)}
          markedDates={[
            {
              date: new Date('2020-01-30'),
              colors: [theme.variables.FOCUS_BLUE_1],
            },
            {
              date: new Date('2020-02-02'),
              colors: [
                theme.variables.FOCUS_BLUE_1,
                theme.variables.RED,
                theme.variables.ORANGE,
                theme.variables.GREEN,
              ],
            },
            {
              date: new Date('2020-02-03'),
              colors: [],
            },
            {
              date: new Date('2020-02-04'),
              colors: [theme.variables.FOCUS_BLUE_1],
            },
            {
              date: new Date('2020-02-05'),
              colors: [theme.variables.FOCUS_BLUE_1],
            },
            {
              date: new Date('2020-02-06'),
              colors: [theme.variables.FOCUS_BLUE_1],
            },
            {
              date: new Date('2020-02-11'),
              colors: [theme.variables.FOCUS_BLUE_1],
            },
            {
              date: new Date('2020-02-10'),
              colors: [theme.variables.FOCUS_BLUE_1],
            },
          ]}
        />
      </Container>

      <DateTimePicker
        show={showDatePicker}
        value={currentView}
        onChange={date => setCurrentView(date)}
        onDismiss={() => setShowDatePicker(false)}
      />
    </>
  );
};

export default injectTheme(CalendarScreen);
