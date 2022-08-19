import { Atomex, AuthToken, AuthTokenSource, Web3BlockchainWallet, } from "atomex-sdk/development";
import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { AppContext } from "../appContext";
import { getTokenBalance } from "../utils/balance";
import { ConnectButton } from "./connectButton";

const checkBalance = async (atomex: Atomex, accountAddress: string) => {
  console.log('ETH Balance: ', (await getTokenBalance(atomex, 'ETH', accountAddress))?.toString());
}

export const MetamaskConnectButton = () => {
  const { atomex } = useContext(AppContext);
  const web3 = new Web3(Web3.givenProvider);
  const isMetamaskAvailable = web3.eth.givenProvider;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const [authToken, setAuthToken] = useState<AuthToken | undefined>();

  useEffect(() => {
    const checkConnectionState = async () => {
      const [accountAddress] = await web3.eth.getAccounts();
      setSelectedAddress(accountAddress);

      if (accountAddress) {
        const authToken = await atomex.authorization.authorize({ address: accountAddress, authTokenSource: AuthTokenSource.Local });
        if (authToken)
          setAuthToken(authToken);

        checkBalance(atomex, accountAddress);
      }

      setIsLoading(false);
    };

    checkConnectionState();
  }, [atomex.authorization, web3.eth])

  const onConnectClick = async () => {
    const requestedAccounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

    const selectedAddress = requestedAccounts[0]
      ? web3.utils.toChecksumAddress(requestedAccounts[0])
      : null

    if (!selectedAddress)
      return

    if (!(await atomex.wallets.getWallet(selectedAddress, 'ethereum')))
      Web3BlockchainWallet.bind(atomex, web3.currentProvider);

    const authToken = await atomex.authorization.authorize({ address: selectedAddress });

    setSelectedAddress(selectedAddress);
    setAuthToken(authToken);
  }

  const errorMessage = !isMetamaskAvailable ? 'Metamask is not installed' : undefined;

  return <ConnectButton
    walletName="Metamask"
    loading={isLoading}
    accountAddress={selectedAddress}
    authToken={authToken}
    onConnectClick={onConnectClick}
    errorMessage={errorMessage} />
}