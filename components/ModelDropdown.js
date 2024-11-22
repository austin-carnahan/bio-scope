import React from 'react';
import { Picker } from '@react-native-picker/picker';

export default function DropdownMenu({ options, selectedOption, onSelect }) {
  return (
    <Picker
      selectedValue={selectedOption}
      onValueChange={(itemValue) => onSelect(itemValue)}
    >
      <Picker.Item label="Select a model" value={null} />
      {options.map((option, index) => (
        <Picker.Item key={index} label={option} value={option} />
      ))}
    </Picker>
  );
}