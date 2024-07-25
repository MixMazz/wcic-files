import { useMemo } from 'react';
import displayText from 'src/assets/tableDisplayText.json';
import { SortingType } from 'src/utils/sortingHelpers';
import { flickMultiplier } from 'src/utils/utils';

import { IoTriangle } from 'react-icons/io5';
import 'src/components/HomeDisplay/CritterTable.css';
import { useTableContext } from 'src/contexts/HomeTableContext';

const LeavingTag = () => {
  return (
    <div className="notesTag shadow leavingTag"><span>{displayText.notes.leaving}</span></div>
  );
}

const NowNewTag = () => {
  return (
    <div className="notesTag shadow newTag"><span>{displayText.notes.new}</span></div>
  );
}

const Headers = () => {
  const { headers, changeSorting, sortType, sortStyle } = useTableContext();
  const showSorting = sortStyle !== 'none';
  const newData = useMemo(() => [
    headers[0], 'pic', 'notes', ...headers.slice(1)
  ], [headers]);

  return (
    <tr>
      {newData.map((item, index) => (
        <th className={`${(sortType === item ? 'activeHeader' : '')}`} key={`headers${index}`}>
          <div className="thDisplay noselect" onClick={() => changeSorting(item as SortingType)}>
            <IoTriangle className="headerIconFiller" />
            {displayText.headers[item as SortingType]}
            {
              (sortType === item && showSorting)
                ? <IoTriangle className={`headerIcon ${sortStyle === 'DSC' ? 'flipIcon' : ''}`} />
                : <IoTriangle className="headerIconFiller" />
            }
          </div>
        </th>
      ))}
    </tr>
  );
};

const Rows = () => {
  const { currentData, flickPrices } = useTableContext();
  return (
    <>
      {currentData.map((item, index) => (
        <tr key={`row${item.pic}${index}`}>
          <td> {item.name} </td>
          <td className="td-image">
            <img className="critterTableImage" src={item.pic} alt="" />
          </td>
          <td className="notesCell">
            {item.notes.leaving && <LeavingTag />}
            {item.notes.new && <NowNewTag />}
          </td>
          {('location' in item) && <td>{item.location}</td>}
          {('shadow' in item) && <td>{item.shadow}</td>}
          {('speed' in item) && <td>{item.speed}</td>}
          {('bubble' in item) && <td>{item.bubble}</td>}
          <td data-testid="critterPrice">
            {flickPrices ? item.value * flickMultiplier : item.value}
          </td>
        </tr>
      ))}
    </>
  )
};

const CritterTable = () => (
  <div id="critterTable" data-testid="critterTable">
    <table className="shadow-md">
      <thead>
        <Headers />
      </thead>
      <tbody>
        <Rows />
      </tbody>
    </table>
  </div>
);

export default CritterTable;
