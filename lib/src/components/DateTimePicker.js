import React from 'react';
import t from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  StyleSheet,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import heroTheme from '../themes/hero';

class DateTimePicker extends React.Component {
  componentDidMount() {
    if (this.props.show && Platform.OS === 'android') {
      DatePickerAndroid.open({
        date: value,
      }).then(({ action, year, month, day }) => {
        if (action === DatePickerAndroid.dismissedAction) {
        }
      });
    }
  }

  render() {
    const { show, value, onChange, theme = heroTheme } = this.props;

    if (!show || Platform.OS === 'android') return null;

    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={theme.dateTimePicker.wrapper}
      >
        <View style={theme.dateTimePicker.actions}>
          <TouchableOpacity style={theme.dateTimePicker.action}>
            <Text style={theme.dateTimePicker.actionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={theme.dateTimePicker.action}>
            <Text
              style={StyleSheet.flatten([
                theme.dateTimePicker.actionText,
                { fontWeight: '600' },
              ])}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <DatePickerIOS mode="date" date={value} onDateChange={onChange} />
      </SafeAreaView>
    );
  }
}

DateTimePicker.propTypes = {};

export default DateTimePicker;
