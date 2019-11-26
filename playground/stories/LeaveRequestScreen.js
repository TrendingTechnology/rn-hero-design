import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {
  TextInput,
  DateTimePicker,
  BottomButton,
  KeyboardAvoidingView,
  ListItem,
  Icon,
} from 'rn-hero-design';
import {
  FOCUS_BLUE_1,
  WHITE,
  RED,
} from 'rn-hero-design/src/themes/hero/variables';

const noop = () => {};

const LeaveRequestScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [changingField, setChangingField] = useState(null);
  const [comment, setComment] = useState('Monthly health checkup');

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
              value="Sick Leave"
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setChangingField('startDate')}>
          <View pointerEvents="none">
            <TextInput
              label="Start date"
              value={startDate.toDateString()}
              rightIcon="calendar"
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setChangingField('endDate')}>
          <View pointerEvents="none">
            <TextInput
              label="End date"
              value={endDate.toDateString()}
              rightIcon="calendar"
              onChangeText={noop}
            />
          </View>
        </TouchableOpacity>

        <TextInput
          label="Total leave hours"
          value="8.00"
          rightIcon="clock-circle-outline"
          onChangeText={noop}
        />

        <TextInput
          label="Comments"
          value={comment}
          rightIcon="comment-outline"
          multiline
          onChangeText={text => setComment(text)}
        />

        <ListItem
          title="Attach file"
          subtitle="Accept only jpeg, jpg, png, pdf extensions"
          onPress={noop}
          wrapperStyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginBottom: 8,
            borderBottomWidth: 0,
          }}
        />
        <ListItem
          title="IMG-001.jpeg"
          rightElement={<Icon icon="cancel-outline" color={RED} size={20} />}
          wrapperStyle={{
            minHeight: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginBottom: 16,
            borderBottomWidth: 0,
          }}
        />
        <ListItem
          title="IMG-002.jpeg"
          rightElement={<Icon icon="cancel-outline" color={RED} size={20} />}
          wrapperStyle={{
            minHeight: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginBottom: 16,
            borderBottomWidth: 0,
          }}
        />
        <ListItem
          title="IMG-003.jpeg"
          rightElement={<Icon icon="cancel-outline" color={RED} size={20} />}
          wrapperStyle={{
            minHeight: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginBottom: 16,
            borderBottomWidth: 0,
          }}
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
