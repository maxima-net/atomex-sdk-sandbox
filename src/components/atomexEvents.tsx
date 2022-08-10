import { AuthToken } from "atomex-sdk/development";
import { Order, OrderBook, Quote } from "atomex-sdk/dist/types/exchange";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext"
import './atomexEvents.scss';

export const AtomexEvents = () => {
  const { atomex } = useContext(AppContext);

  const [events, setEvents] = useState<string[]>([]);

  const onAuthorized = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, `authorized:\n${JSON.stringify(authToken)}`]);
  }

  const onUnauthorized = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, `unauthorized:\n${JSON.stringify(authToken)}`]);
  }

  const onAuthTokenExpiring = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, `authTokenExpiring:\n${JSON.stringify(authToken)}`]);
  }

  const onAuthTokenExpired = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, `authTokenExpired:\n${JSON.stringify(authToken)}`]);
  }

  const onTopOfBookUpdated = (quotes: readonly Quote[]) => {
    setEvents((prevValue) => [...prevValue, `topOfBookUpdated:\n${JSON.stringify(quotes)}`]);
  }

  const onOrderBookUpdated = (orderBook: OrderBook) => {
    setEvents((prevValue) => [...prevValue, `orderBookUpdated:\n${JSON.stringify(orderBook)}`]);
  }

  const onOrderUpdated = (order: Order) => {
    setEvents((prevValue) => [...prevValue, `orderUpdated:\n${JSON.stringify(order)}`]);
  }

  useEffect(() => {
    atomex.authorization.events.authorized.addListener(onAuthorized);
    atomex.authorization.events.unauthorized.addListener(onUnauthorized);
    atomex.authorization.events.authTokenExpiring.addListener(onAuthTokenExpiring);
    atomex.authorization.events.authTokenExpired.addListener(onAuthTokenExpired);
    atomex.exchangeManager.events.topOfBookUpdated.addListener(onTopOfBookUpdated);
    atomex.exchangeManager.events.orderBookUpdated.addListener(onOrderBookUpdated);
    atomex.exchangeManager.events.orderUpdated.addListener(onOrderUpdated);

    return () => {
      atomex.authorization.events.authorized.removeListener(onAuthorized);
      atomex.authorization.events.unauthorized.removeListener(onUnauthorized);
      atomex.authorization.events.authTokenExpiring.removeListener(onAuthTokenExpiring);
      atomex.authorization.events.authTokenExpired.removeListener(onAuthTokenExpired);
      atomex.exchangeManager.events.topOfBookUpdated.removeListener(onTopOfBookUpdated);
      atomex.exchangeManager.events.orderBookUpdated.removeListener(onOrderBookUpdated);
      atomex.exchangeManager.events.orderUpdated.removeListener(onOrderUpdated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = events.reduce((prevResult, currentValue, index) => `${currentValue}${index !== 0 ? '\n\n' : ''}${prevResult}`, '');
  console.log(events);

  return <div className="atomex-events">
    <span>Events</span>
    <textarea className="atomex-events__textarea" readOnly value={text}></textarea>
  </div>
}
