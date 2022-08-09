import { createDefaultTestnetAtomex } from 'atomex-sdk/development';
import { EthereumConnectButton } from './components/ethereumConnectButton';
import './App.css';

function App() {
  const atomex = createDefaultTestnetAtomex();
  atomex.start();

  return (
    <div className="App">
      <header className="App-header">Atomex Sdk Playground</header>
      <EthereumConnectButton />
    </div>
  );
}

export default App;
