import { TempleDAppPermission, TempleWallet } from "@temple-wallet/dapp";
import { AuthToken, AuthTokenSource, WalletTezosSigner, Web3EthereumSigner } from "atomex-sdk/development";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext";
import { ConnectButton } from "./connectButton";

export const TempleConnectButton = () => {
  const { atomex } = useContext(AppContext);

  const [isTempleAvailable, setIsTempleAvailable] = useState<boolean | undefined>();
  const [permission, setPermission] = useState<TempleDAppPermission | undefined>();
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const [authToken, setAuthToken] = useState<AuthToken | undefined>();
  const temple = new TempleWallet('Atomex DEX', permission);

  useEffect(() => {
    const checkConnectionState = async () => {
      const isTempleAvailable = await TempleWallet.isAvailable();
      setIsTempleAvailable(isTempleAvailable);

      if (isTempleAvailable) {
        const permission = await TempleWallet.getCurrentPermission();
        setPermission(permission);
        setSelectedAddress(permission?.pkh);

        if (permission) {
          const authToken = await atomex.authorization.authorize({ address: permission.pkh, authTokenSource: AuthTokenSource.Local });
          if (authToken)
            setAuthToken(authToken);
        }
      }
    };

    checkConnectionState();
  }, []);

  const onConnectClick = async () => {
    await (temple as any).connect('ghostnet');
    const selectedAddress = temple.permission?.pkh;
    if (!selectedAddress)
      return

    if (!(await atomex.signers.findSigner(selectedAddress)))
      WalletTezosSigner.bind(atomex, temple);

    const authToken = await atomex.authorization.authorize({ address: selectedAddress });

    setSelectedAddress(selectedAddress);
    setAuthToken(authToken);
  }

  const errorMessage = !isTempleAvailable ? 'Temple is not installed' : undefined;

  return <ConnectButton
    walletName="Temple"
    accountAddress={selectedAddress}
    authToken={authToken}
    onConnectClick={onConnectClick}
    errorMessage={errorMessage} />
}