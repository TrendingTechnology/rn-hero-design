import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput, DateTimePicker, BottomButton } from 'rn-hero-design';

const noop = () => {};

const TextInputScreen = () => {
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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={88}
      enabled
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity>
          <View pointerEvents="none">
            <TextInput label="Leave category" value="" onChangeText={noop} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View pointerEvents="none">
            <TextInput
              label="Start date"
              value={startDate.toISOString()}
              rightIcon="calendar"
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View pointerEvents="none">
            <TextInput
              label="End date"
              value={endDate.toISOString()}
              rightIcon="calendar"
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TextInput
          label="Comments"
          value=""
          rightIcon="comment-outline"
          onChangeText={noop}
        />

        <TextInput
          label="Total leave hours"
          value=""
          rightIcon="clock-circle-outline"
          onChangeText={noop}
        />
      </ScrollView>

      <DateTimePicker
        show={!!changingField}
        value={fieldMap[changingField].value}
        onChange={date => fieldMap[changingField].onChange(date)}
        onDismiss={() => setChangingField(null)}
      />

      <BottomButton text="Register" onPress={() => {}} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});

export default TextInputScreen;
