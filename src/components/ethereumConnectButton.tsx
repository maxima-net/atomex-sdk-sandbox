import { Web3EthereumSigner } from "atomex-sdk/development";
import { useContext } from "react";
import Web3 from "web3";
import { AppContext } from "../appContext";

export const EthereumConnectButton = () => {
  const { atomex } = useContext(AppContext);
  const onClick = async () => {
    const requestedAccounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(Web3.givenProvider);

    const selectedAddress = requestedAccounts[0]
      ? web3.utils.toChecksumAddress(requestedAccounts[0])
      : null

    if (!selectedAddress)
      return

    if (!(await atomex.signers.findSigner(selectedAddress, 'ethereum')))
      Web3EthereumSigner.bind(atomex, web3 as any);

    const authToken = await atomex.authorization.authorize({ address: selectedAddress });
    console.log(authToken);
  }

  return <button onClick={onClick}>Connect Ethereum</button>
}