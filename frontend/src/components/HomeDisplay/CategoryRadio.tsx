import React from 'react';
import { useTableContext } from 'src/contexts/HomeTableContext';
import { CritterType } from 'src/utils/critterTypes';

const labels: Record<CritterType, string> = {
  "bug": "Bugs",
  "fish": "Fish",
  "sealife": "Sea Life",
}

const Radio: React.FC<{ type: CritterType }> = ({ type }) => {
  const { displayCategory, changeDisplayCategory } = useTableContext();
  return (
    <label className="radio" htmlFor={`${type}Radio'`} onClick={(e) => {
      e.preventDefault();
      changeDisplayCategory(type);
    }}>
      <input id={`${type}Radio`} type="radio" value={type} name="category" checked={displayCategory === type} onChange={() => { }} />
      <span className="categoryName">{labels[type]}</span>
    </label>
  )
}

const CategoryRadio = () => {
  return (
    <div id="categoryRadio">
      <Radio type="bug" />
      <br />
      <Radio type="fish" />
      <br />
      <Radio type="sealife" />
    </div>
  )
};

export default CategoryRadio;
