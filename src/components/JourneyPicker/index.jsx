import React, { useEffect, useState } from 'react';
import './style.css';

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Odesílám formulář s cestou');
    console.log(`Odkud: ${fromCity}, Kam: ${toCity}, Datum: ${date}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await response.json();
      setCities(data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <CityOptions
              cities={cities}
              value={fromCity}
              onJourneyChange={(e) => setFromCity(e.target.value)}
            />
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <CityOptions
              cities={cities}
              value={toCity}
              onJourneyChange={(e) => setToCity(e.target.value)}
            />
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option>
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};

const CityOptions = ({ value, onJourneyChange, cities }) => {
  return (
    <>
      <select value={value} onChange={onJourneyChange}>
        <option value="">Vyberte</option>
        {cities.map((city) => (
          <option key={city.code} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
};
