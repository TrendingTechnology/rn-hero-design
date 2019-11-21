import React from 'react';
import t from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  Keyboard,
  StyleSheet,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import heroTheme from '../themes/hero';

const isAndroid = Platform.OS === 'android';

class DateTimePickerIOS extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pickedDate: props.value };
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.handleKeyboardWillShow,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
  }

  handleKeyboardWillShow = () => this.props.onDismiss();

  componentWillReceiveProps(nextProps) {
    this.setState({ pickedDate: nextProps.value });
  }

  handleDismiss = () => this.props.onDismiss();

  handleChange = () => {
    const { pickedDate } = this.state;
    const { onChange, onDismiss } = this.props;
    onChange(pickedDate);
    onDismiss();
  };

  handleDateChange = date => this.setState({ pickedDate: date });

  render() {
    const { pickedDate } = this.state;
    const { show, mode, theme = heroTheme } = this.props;

    if (!show) return null;

    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={theme.dateTimePicker.wrapper}
      >
        <View style={theme.dateTimePicker.actions}>
          <TouchableOpacity
            onPress={this.handleDismiss}
            style={theme.dateTimePicker.action}
          >
            <Text style={theme.dateTimePicker.actionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleChange}
            style={theme.dateTimePicker.action}
          >
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
        <DatePickerIOS
          mode={mode}
          date={pickedDate}
          onDateChange={this.handleDateChange}
        />
      </SafeAreaView>
    );
  }
}

class DateTimePickerAndroid extends React.Component {
  componentDidMount() {
    const { show, mode, value, onChange, onDismiss } = this.props;

    if (show)
      this.openDateTimePickerAndroid({ mode, value, onChange, onDismiss });
  }

  componentWillReceiveProps(nextProps) {
    const prevShow = this.props.show;
    const { show, mode, value, onChange, onDismiss } = nextProps;

    if (prevShow !== show && show)
      this.openDateTimePickerAndroid({ mode, value, onChange, onDismiss });
  }

  openDateTimePickerAndroid = ({ mode, value, onChange, onDismiss }) => {
    if (mode === 'date') {
      DatePickerAndroid.open({
        date: value,
      }).then(({ action, year, month, day }) => {
        if (action === DatePickerAndroid.dateSetAction)
          onChange(new Date(year, month, day));

        onDismiss();
      });
    }
  };

  render() {
    return null;
  }
}

const DateTimePicker = props =>
  isAndroid ? (
    <DateTimePickerAndroid {...props} />
  ) : (
    <DateTimePickerIOS {...props} />
  );

DateTimePicker.propTypes = {
  show: t.bool,
  mode: t.oneOf(['date', 'datetime']),
  value: t.object,
  onChange: t.func,
  onDismiss: t.func,
};

DateTimePicker.defaultProps = {
  mode: 'date',
};

export default DateTimePicker;
