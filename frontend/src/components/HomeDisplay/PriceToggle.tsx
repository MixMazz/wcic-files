import 'src/components/HomeDisplay/PriceToggle.css';
import { useTableContext } from 'src/contexts/HomeTableContext';

const PriceToggle = () => {
  const { flickPrices, setFlickPrices } = useTableContext();
  return (
    <div id="pricesContainer">
      <span className="showPriceText">Show Prices For:</span>
      <div className="toggleContainer">
        <span className="priceLabel">Nook</span>
        <label className="priceToggle">
          <input
            name="priceToggle"
            data-testid="priceToggle"
            type="checkbox"
            checked={flickPrices}
            onChange={() => setFlickPrices(prev => !prev)}
          />
          <span className="slider" />
        </label>
        <span className="priceLabel">Flick</span>
      </div>
    </div>
  )
};

export default PriceToggle;
