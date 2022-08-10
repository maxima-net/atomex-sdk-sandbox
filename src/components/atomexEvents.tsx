import { AuthToken } from "atomex-sdk/development";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext"
import './atomexEvents.scss';

export const AtomexEvents = () => {
  const { atomex } = useContext(AppContext);

  const [events, setEvents] = useState<string[]>([]);

  const onAuthorized = (authToken: AuthToken) => {
    setEvents([...events, `onAuthorized: ${JSON.stringify(authToken)}`]);
  }

  const onUnauthorized = (authToken: AuthToken) => {
    setEvents([...events, `onUnauthorized: ${JSON.stringify(authToken)}`]);
  }

  const onAuthTokenExpiring = (authToken: AuthToken) => {
    setEvents([...events, `onAuthTokenExpiring: ${JSON.stringify(authToken)}`]);
  }

  const onAuthTokenExpired = (authToken: AuthToken) => {
    setEvents([...events, `onAuthTokenExpired: ${JSON.stringify(authToken)}`]);
  }

  useEffect(() => {
    atomex.authorization.events.authorized.addListener(onAuthorized);
    atomex.authorization.events.unauthorized.addListener(onUnauthorized);
    atomex.authorization.events.authTokenExpiring.addListener(onAuthTokenExpiring);
    atomex.authorization.events.authTokenExpired.addListener(onAuthTokenExpired);

    return () => {
      atomex.authorization.events.authorized.removeListener(onAuthorized);
      atomex.authorization.events.unauthorized.removeListener(onUnauthorized);
      atomex.authorization.events.authTokenExpiring.removeListener(onAuthTokenExpiring);
      atomex.authorization.events.authTokenExpired.removeListener(onAuthTokenExpired);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = events.reduce((prevResult, currentValue, index) => `${prevResult}${index !== 0 ? '\n' : ''}${currentValue}`, '');

  return <div className="atomex-events">
    <span>Events</span>
    <textarea className="atomex-events__textarea" readOnly value={text}></textarea>
  </div>
}
