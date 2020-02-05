import React from 'react';
import { Calendar, DateTimePicker, Container } from 'rn-hero-design';

const CalendarScreen = () => {
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

export default CalendarScreen;
