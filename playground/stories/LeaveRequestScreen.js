import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {
  TextInput,
  DateTimePicker,
  BottomButton,
  KeyboardAvoidingView,
} from 'rn-hero-design';
import { FOCUS_BLUE_1, WHITE } from 'rn-hero-design/src/themes/hero/variables';

const noop = () => {};

const LeaveRequestScreen = () => {
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
    <KeyboardAvoidingView withNavigation style={styles.keyboardAvoidingView}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
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
        text="Submit"
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

LeaveRequestScreen.navigationOptions = {
  title: 'Leave request',
  headerStyle: {
    backgroundColor: FOCUS_BLUE_1,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: WHITE,
  },
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});

export default LeaveRequestScreen;
