import './styles.css';
import IMAGE from './react.png';
import LOGO from './logo.svg';

const App = () => {
  // const  {name} = process.env;
  // console.log('=====================', JSON.stringify(process.env.name,null,2));
  return <>
    <h1>App component - {process.env.NODE_ENV} {process.env.name} {process.env.TEMP}</h1>
    <img src={IMAGE} alt="React logo" width="200" height="200"/>
    <img src={LOGO} alt="React logo svg" width="200" height="200"/>
  </>
}

export default App;
