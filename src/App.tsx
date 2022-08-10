import { MetamaskConnectButton } from './components/metamaskConnectButton';
import { AtomexEvents } from './components/atomexEvents';
import './App.css';

function App() {
  return <>
    <header className="header">Atomex SKD Playground</header>
    <div className="container">
      <MetamaskConnectButton />
      <AtomexEvents />
    </div>
  </>;
}

export default App;
