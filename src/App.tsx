import { MetamaskConnectButton } from './components/metamaskConnectButton';
import './App.css';

function App() {
  return <>
    <header className="header">Atomex SKD Playground</header>
    <div className="container">
      <MetamaskConnectButton />
    </div>
  </>;
}

export default App;
