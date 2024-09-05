import './styles.css';
import IMAGE from './react.png';
import LOGO from './logo.svg';


const App = () => {
    return <>
      <h1>App component</h1>
      <img src={IMAGE} alt="React logo" width="200" height="200"/>
      <img src={LOGO} alt="React logo svg" width="200" height="200"/>
    </>
}

export default App;
