import CritterDataDisplay from 'src/components/HomeDisplay/CritterDataDisplay';
import HemisphereToggle from 'src/components/HomeDisplay/HemisphereToggle';
import TimeInteractive from 'src/components/HomeDisplay/TimeInteractive';
import 'src/pages/Home.css';

const Home = () => {
  return (
    <>
      <HemisphereToggle />
      <TimeInteractive />
      <CritterDataDisplay />
    </>
  );
}

export default Home;
