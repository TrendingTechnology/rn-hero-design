import React from 'react';
import { Container, Select } from 'rn-hero-design';

const options = [
  { label: 'Vietnam', value: 'vi' },
  { label: 'English', value: 'en' },
];

const SelectScreen = () => (
  <>
    <Container fluid></Container>

    <Select show value="en" options={options} />
  </>
);

export default SelectScreen;
