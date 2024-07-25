import PriceToggle from 'components/HomeDisplay/PriceToggle';
import CategoryRadio from 'components/HomeDisplay/CategoryRadio';
import CheckboxShowMissing from 'components/HomeDisplay/CheckboxShowMissing';
import CritterTable from 'components/HomeDisplay/CritterTable';
import LoginPrompt from 'components/HomeDisplay/LoginPrompt';
import CompletedInventory from 'components/HomeDisplay/CompletedInventory';
import { useUserContext } from 'src/contexts/UserContext';
import { useTableContext } from 'src/contexts/HomeTableContext';

const CritterDataDisplay = () => {
  const { displayCategory, showMissing, currentData } = useTableContext();
  const { loggedInUser } = useUserContext();

  const showLoginPrompt = showMissing && !loggedInUser;
  const showCompletedScreen = currentData.length === 0;
  const showTable = !showLoginPrompt && !showCompletedScreen;

  return (
    <>
      <div className="card shadow">
        <div id="tableSelectors">
          <CategoryRadio />
          <div id="tableMinorAdj">
            <CheckboxShowMissing />
            {
              (displayCategory === 'bug') && <PriceToggle />
            }
          </div>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        {showLoginPrompt && <LoginPrompt />}
        {showCompletedScreen && <CompletedInventory />}
        {showTable && <CritterTable />}
      </div>
      <br />
    </>
  );
}

export default CritterDataDisplay;
