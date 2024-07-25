import CritterDataDisplay from 'components/HomeDisplay/CritterDataDisplay';
import HemisphereToggle from 'components/HomeDisplay/HemisphereToggle';
import TimeInteractive from 'components/HomeDisplay/TimeInteractive';
import HomeTableProvider from 'src/contexts/HomeTableContext';
import 'src/pages/Home.css';

const Home = () => {
  return (
    <>
      <HemisphereToggle />
      <TimeInteractive />
      <HomeTableProvider>
        <CritterDataDisplay />
      </HomeTableProvider>
    </>
  );
}

export default Home;
