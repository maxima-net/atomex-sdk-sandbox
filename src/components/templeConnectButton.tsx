import { TempleDAppPermission, TempleWallet } from "@temple-wallet/dapp";
import { Atomex, AuthToken, AuthTokenSource, TaquitoBlockchainWallet } from "atomex-sdk/development";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext";
import { getTokenBalance } from "../utils/balance";
import { ConnectButton } from "./connectButton";

const checkBalance = async (atomex: Atomex, accountAddress: string) => {
  console.log('XTZ Balance: ', (await getTokenBalance(atomex, 'XTZ', accountAddress))?.toString());
}

export const TempleConnectButton = () => {
  const { atomex } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
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
          await (temple as any).connect('ghostnet');
          TaquitoBlockchainWallet.bind(atomex, temple);

          const authToken = await atomex.authorization.authorize({ address: permission.pkh, authTokenSource: AuthTokenSource.Local });
          if (authToken)
            setAuthToken(authToken);

          checkBalance(atomex, permission.pkh);
        }
      }

      setIsLoading(false)
    };

    checkConnectionState();
  }, [atomex, atomex.authorization]);

  const onConnectClick = async () => {
    await (temple as any).connect('ghostnet');
    const selectedAddress = temple.permission?.pkh;
    if (!selectedAddress)
      return

    TaquitoBlockchainWallet.bind(atomex, temple);

    const authToken = await atomex.authorization.authorize({ address: selectedAddress });

    setSelectedAddress(selectedAddress);
    setAuthToken(authToken);
  }

  const errorMessage = !isTempleAvailable ? 'Temple is not installed' : undefined;

  return <ConnectButton
    walletName="Temple"
    loading={isLoading}
    accountAddress={selectedAddress}
    authToken={authToken}
    onConnectClick={onConnectClick}
    errorMessage={errorMessage} />
}