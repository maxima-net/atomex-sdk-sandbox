import { AuthToken } from "atomex-sdk/development";
import './connectButton.scss';

interface ConnectButtonProps {
  walletName: string;
  loading: boolean;
  accountAddress?: string;
  authToken?: AuthToken;
  onConnectClick: () => void;
  errorMessage?: string;
}

export const ConnectButton = ({ loading, accountAddress, authToken, errorMessage, walletName, onConnectClick }: ConnectButtonProps) => {
  const connectionState = accountAddress ? `Connected to ${accountAddress}` : 'Not connected';
  const authorizationState = authToken?.userId ? `Authorized user: ${authToken?.userId}` : 'Not authorized';
  const text = loading
    ? 'Loading...'
    : errorMessage
      ? errorMessage
      : `${connectionState}; ${authorizationState}`;
  const isConnectButtonDisabled = !!errorMessage || (!!accountAddress && !!authToken?.userId);

  return <div className="connect-button">
    <button className="connect-button__button" disabled={isConnectButtonDisabled} onClick={onConnectClick}>Connect {walletName}</button>
    <span className="connect-button__status">{text}</span>
  </div>
}