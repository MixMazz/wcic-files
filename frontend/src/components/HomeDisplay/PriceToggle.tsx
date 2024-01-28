import React from 'react';
import 'src/components/HomeDisplay/PriceToggle.css';

const PriceToggle: React.FC<{
  checked: boolean,
  handleChange: any
}> = ({ checked, handleChange }) => (
  <div id="pricesContainer">
    <span className="showPriceText">Show Prices For:</span>
    <div className="toggleContainer">
      <span className="priceLabel">Nook</span>
      <label className="priceToggle">
        <input
          name="priceToggle"
          data-testid="priceToggle"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider" />
      </label>
      <span className="priceLabel">Flick</span>
    </div>
  </div>
);

export default PriceToggle;
