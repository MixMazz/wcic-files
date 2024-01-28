import React, { useMemo } from 'react';
import { TableData } from 'src/utils/critterTypes';
import { SortingType } from 'src/utils/sortingHelpers';
import { flickMultiplier } from 'src/utils/utils';
import displayText from 'src/displayText.json';
import 'src/components/HomeDisplay/CritterTable.css';
import { IoTriangle } from 'react-icons/io5';

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

const Headers: React.FC<{
  currentHeaders: string[],
  updateSorting: (type: SortingType) => void,
  sortType: SortingType | null,
  sortStyle: "ASC" | "DSC" | "none",
}> = ({
  currentHeaders, updateSorting, sortType, sortStyle,
}) => {
    const showSorting = sortStyle !== 'none';
    const newData = useMemo(() => [
      currentHeaders[0], 'pic', 'notes', ...currentHeaders.slice(1)
    ], [currentHeaders]);

    return (
      <tr className="tableHeaderRow">
        {newData.map((item, index) => (
          <th className={`${(sortType === item ? 'activeHeader' : '')}`} key={`headers${index}`}>
            <div className="thDisplay noselect" onClick={() => updateSorting(item as SortingType)}>
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

const Rows: React.FC<{
  data: TableData[],
  usingFlickPrices: boolean
}> = ({ data, usingFlickPrices }) => (
  <>
    {data.map((item, index) => (
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
          {usingFlickPrices ? item.value * flickMultiplier : item.value}
        </td>
      </tr>
    ))}
  </>
);

interface ICritterTable {
  currentHeaders: string[],
  currentData: TableData[],
  updateSorting: (type: SortingType) => void,
  sortType: SortingType | null,
  sortStyle: 'ASC' | 'DSC' | 'none',
  usingFlickPrices: boolean
}

const CritterTable: React.FC<ICritterTable> = ({
  currentHeaders, currentData, updateSorting, sortType, sortStyle, usingFlickPrices,
}) => (
  <div id="critterTable" data-testid="critterTable">
    <table className="shadow-md">
      <thead>
        <Headers {...{
          currentHeaders, updateSorting, sortType, sortStyle,
        }}
        />
      </thead>
      <tbody>
        <Rows data={currentData} usingFlickPrices={usingFlickPrices} />
      </tbody>
    </table>
  </div>
);

export default CritterTable;
