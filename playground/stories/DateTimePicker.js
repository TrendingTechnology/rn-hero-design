import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { DateTimePicker, TextInput, Container } from 'rn-hero-design';

const noop = () => {};

const DateTimePickerScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [changingField, setChangingField] = useState(null);

  const fieldMap = {
    startDate: {
      value: startDate,
      onChange: setStartDate,
    },
    endDate: {
      value: endDate,
      onChange: setEndDate,
    },
    null: {
      value: null,
      onChange: noop,
    },
  };

  return (
    <>
      <Container fluid>
        <TouchableOpacity onPress={() => setChangingField('startDate')}>
          <View pointerEvents="none">
            <TextInput
              label="Start date"
              value={startDate.toISOString()}
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setChangingField('endDate')}>
          <View pointerEvents="none">
            <TextInput
              label="End date"
              value={endDate.toISOString()}
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>
      </Container>

      <DateTimePicker
        show={!!changingField}
        value={fieldMap[changingField].value}
        onChange={date => fieldMap[changingField].onChange(date)}
        onDismiss={() => setChangingField(null)}
      />
    </>
  );
};

export default DateTimePickerScreen;
