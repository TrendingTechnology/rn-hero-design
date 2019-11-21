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
  const [comment, setComment] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  );

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
            <TextInput
              label="Leave category"
              value="Annual Leave"
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setChangingField('startDate')}>
          <View pointerEvents="none">
            <TextInput
              label="Start date"
              value={startDate.toISOString()}
              rightIcon="calendar"
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setChangingField('endDate')}>
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
          value={comment}
          rightIcon="comment-outline"
          multiline
          onChangeText={text => setComment(text)}
        />

        <TextInput
          label="Total leave hours"
          value=""
          rightIcon="clock-circle-outline"
          onChangeText={noop}
        />
      </ScrollView>

      <BottomButton
        text="Register"
        forceInset={changingField ? 'never' : null}
        onPress={() => {}}
      />

      <DateTimePicker
        show={!!changingField}
        value={fieldMap[changingField].value}
        onChange={date => fieldMap[changingField].onChange(date)}
        onDismiss={() => setChangingField(null)}
      />
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
