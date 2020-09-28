import React, { useState } from 'react';
import { ScrollView, Switch } from 'react-native';
import { Switch as HDSwitch, ListItem } from 'rn-hero-design';

const SwitchScreen = () => {
  let [switch1, setSwitch1] = useState(false);
  let [switch2, setSwitch2] = useState(true);

  return (
    <ScrollView>
      <ListItem
        title="Default off"
        rightElement={<HDSwitch value={switch1} onValueChange={setSwitch1} />}
        wrapperStyle={{ minHeight: 0 }}
      />
      <ListItem
        title="Default on"
        rightElement={<HDSwitch value={switch2} onValueChange={setSwitch2} />}
        wrapperStyle={{ minHeight: 0 }}
      />
      <ListItem
        title="Native switch"
        rightElement={<Switch value={true} />}
        wrapperStyle={{ minHeight: 0 }}
      />
    </ScrollView>
  );
};

export default SwitchScreen;
