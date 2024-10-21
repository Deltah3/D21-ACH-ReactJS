import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const CityTabs = ({ cities, activeCity, handleSelectCity, handleRemoveCity }) => {
  return (
    <Tabs
      id="city-tabs"
      activeKey={activeCity}
      onSelect={handleSelectCity}
      className="mb-3"
    >
      {cities.map((city, index) => (
        <Tab key={index} eventKey={city} title={city}>
          <button onClick={() => handleRemoveCity(city)} className="btn btn-danger btn-sm">Supprimer</button>
        </Tab>
      ))}
    </Tabs>
  );
};

export default CityTabs;
