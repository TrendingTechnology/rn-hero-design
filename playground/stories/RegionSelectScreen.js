import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import {
  Container,
  Text,
  ButtonGroup,
  BottomButton,
  injectTheme,
} from 'rn-hero-design';
import { FOCUS_BLUE_1, WHITE } from 'rn-hero-design/src/themes/hero/variables';
import legacyTheme from 'rn-hero-design/src/themes/legacy/Legacy_Theme.bs';

const RegionSelectScreen = ({ theme }) => {
  const [region, setRegion] = useState('au');

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeArea}>
        <Container>
          <Text style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
            Select your region
          </Text>

          <ButtonGroup>
            <ButtonGroup.Button
              text="Australia"
              active={region === 'au'}
              onPress={() => setRegion('au')}
              width="50%"
            />

            <ButtonGroup.Button
              text="European Union (EU)"
              active={region === 'eu'}
              onPress={() => setRegion('eu')}
              width="50%"
            />
          </ButtonGroup>
        </Container>
      </SafeAreaView>

      <BottomButton
        text="Confirm"
        onPress={() =>
          Alert.alert(
            'Alert',
            'Changing to another region requires re-logging in. Proceed to the login screen?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
          )
        }
        theme={legacyTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

RegionSelectScreen.navigationOptions = {
  title: 'Change Region',
  headerStyle: {
    backgroundColor: FOCUS_BLUE_1,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: WHITE,
  },
};

export default injectTheme(RegionSelectScreen);
// import React, { useState } from 'react';
// import { View, SafeAreaView, StyleSheet } from 'react-native';
// import {
//   Container,
//   Text,
//   ButtonGroup,
//   BottomButton,
//   injectTheme,
// } from 'rn-hero-design';
// import { FOCUS_BLUE_1 } from 'rn-hero-design/src/themes/hero/variables';
// import legacyTheme from 'rn-hero-design/src/themes/legacy/Legacy_Theme.bs';

// const RegionSelectScreen = ({ theme }) => {
//   const [region, setRegion] = useState('au');

//   return (
//     <View style={styles.wrapper}>
//       <SafeAreaView style={styles.safeArea}>
//         <Container>
//           <Text
//             color={theme.variables.WHITE}
//             style={{ marginBottom: theme.variables.MEDIUM_SIZE }}
//           >
//             Select your region
//           </Text>

//           <ButtonGroup>
//             <ButtonGroup.Button
//               text="Australia"
//               active={region === 'au'}
//               onPress={() => setRegion('au')}
//               width="50%"
//               inactiveButtonStyle={{
//                 borderColor: theme.variables.WHITE,
//                 backgroundColor: 'transparent',
//               }}
//               inactiveTextStyle={{
//                 color: theme.variables.WHITE,
//               }}
//               activeButtonStyle={{
//                 borderColor: theme.variables.WHITE,
//                 backgroundColor: theme.variables.WHITE,
//               }}
//               activeTextStyle={{
//                 color: theme.variables.DARK_PRIMARY_COLOR,
//               }}
//             />

//             <ButtonGroup.Button
//               text="European Union (EU)"
//               active={region === 'eu'}
//               onPress={() => setRegion('eu')}
//               width="50%"
//               inactiveButtonStyle={{
//                 borderColor: theme.variables.WHITE,
//                 backgroundColor: 'transparent',
//               }}
//               inactiveTextStyle={{
//                 color: theme.variables.WHITE,
//               }}
//               activeButtonStyle={{
//                 borderColor: theme.variables.WHITE,
//                 backgroundColor: theme.variables.WHITE,
//               }}
//               activeTextStyle={{
//                 color: theme.variables.DARK_PRIMARY_COLOR,
//               }}
//             />
//           </ButtonGroup>
//         </Container>
//       </SafeAreaView>

//       <BottomButton
//         text="Continue"
//         onPress={() => {}}
//         theme={legacyTheme}
//         wrapperStyle={{
//           backgroundColor: 'transparent',
//           borderTopWidth: StyleSheet.hairlineWidth,
//           borderTopColor: theme.variables.WHITE,
//         }}
//         textStyle={{
//           color: theme.variables.WHITE,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: FOCUS_BLUE_1,
//   },
//   safeArea: {
//     flex: 1,
//   },
// });

// RegionSelectScreen.navigationOptions = {
//   header: null,
// };

// export default injectTheme(RegionSelectScreen);
