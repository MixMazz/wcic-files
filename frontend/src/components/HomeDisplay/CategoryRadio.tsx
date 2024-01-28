import React from 'react';
import { CritterType } from 'src/utils/critterTypes';

const CategoryRadio: React.FC<{
  currentActive: CritterType,
  handleChange: (type: CritterType) => void,
}> = ({ currentActive, handleChange }) => (
  <div id="categoryRadio">
    <label className="radio" htmlFor='bugRadio' onClick={(e) => {
      e.preventDefault();
      handleChange("bug");
    }}>
      <input id="bugRadio" type="radio" value="bug" name="category" checked={currentActive === 'bug'} onChange={() => { }} />
      <span className="categoryName">Bugs</span>
    </label>
    <br />
    <label className="radio" htmlFor='fishRadio' onClick={(e) => {
      e.preventDefault();
      handleChange("fish");
    }}>
      <input id="fishRadio" type="radio" value="fish" name="category" checked={currentActive === 'fish'} onChange={() => { }} />
      <span className="categoryName">Fish</span>
    </label>
    <br />
    <label className="radio" htmlFor='sealifeRadio' onClick={(e) => {
      e.preventDefault();
      handleChange("sealife");
    }}>
      <input id="sealifeRadio" type="radio" value="sealife" name="category" checked={currentActive === 'sealife'} onChange={() => { }} />
      <span className="categoryName">Sea Life</span>
    </label>
  </div>
);

export default CategoryRadio;
