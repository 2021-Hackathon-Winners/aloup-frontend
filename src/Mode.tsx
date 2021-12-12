
import logo from './logo.svg';
import './Signin.css';

const Mode: React.FC<{onMode: (a: string) => void}> = (props) =>  {
    return (
    <>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>aloup</h1>
        <button onClick={() => props.onMode("player")}>Player</button>
        <button onClick={() => props.onMode("gm")}>Game Master</button>
    </>
    );
  }
  
  export default Mode;