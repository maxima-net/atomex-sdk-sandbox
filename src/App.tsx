import { MetamaskConnectButton } from './components/metamaskConnectButton';
import { AtomexEvents } from './components/atomexEvents';
import { TempleConnectButton } from './components/templeConnectButton';
import { Exchange } from './components/exchange';
import './App.css';

function App() {
  return <>
    <header className="header">Atomex SKD Playground</header>
    <div className="container">
      <MetamaskConnectButton />
      <TempleConnectButton />
      <Exchange />
      <AtomexEvents />
    </div>
  </>;
}

export default App;
