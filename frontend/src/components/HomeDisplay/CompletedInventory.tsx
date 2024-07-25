import 'src/components/HomeDisplay/CompletedInventory.css';

const CompletedInventory = () => {
  return (
    <div id="completedInventoryCard" className="card shadow">
      <span id="completedYes">
        <div className="yesLetters">Y</div>
        <div className="yesLetters">e</div>
        <div className="yesLetters">s</div>
        <div className="yesLetters">!</div>
        <div className="yesLetters">!</div>
      </span>
      <div id="completedBanner">
        <p>You caught all available creatures!</p>
        <div id="bannerStitching">
          <div />
        </div>
      </div>
    </div>
  );
}

export default CompletedInventory;
