import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DateTimePicker, TextInput } from 'rn-hero-design';

const noop = () => {};

const DateTimePickerScreen = () => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
          <TextInput
            label="Start date"
            value={startDate.toISOString()}
            onChangeText={noop}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
      <DateTimePicker
        show={showDateTimePicker}
        value={startDate}
        onChange={date => setStartDate(date)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default DateTimePickerScreen;
