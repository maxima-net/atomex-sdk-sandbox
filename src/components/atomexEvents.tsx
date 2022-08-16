import { AuthToken } from "atomex-sdk/development";
import { Order, OrderBook, Quote } from "atomex-sdk/dist/types/exchange";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext"
import './atomexEvents.scss';

const getLogText = (event: string, data: any) => {
  const now = new Date();
  const timeString = `${formatTimeValue(now.getHours())}:${formatTimeValue(now.getMinutes())}:${formatTimeValue(now.getSeconds())}.${now.getMilliseconds()}`;
  return `${timeString}\n${event}:\n${JSON.stringify(data)}`;
}

const formatTimeValue = (value: number) => {
  return `${value < 10 ? '0' : ''}${value}`;
}

export const AtomexEvents = () => {
  const { atomex } = useContext(AppContext);

  const [events, setEvents] = useState<string[]>([]);

  const onAuthorized = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, getLogText('authorized', authToken)]);
  }

  const onUnauthorized = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, getLogText('unauthorized', authToken)]);
  }

  const onAuthTokenExpiring = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, getLogText('authTokenExpiring', authToken)]);
  }

  const onAuthTokenExpired = (authToken: AuthToken) => {
    setEvents((prevValue) => [...prevValue, getLogText('authTokenExpired', authToken)]);
  }

  const onTopOfBookUpdated = (quotes: readonly Quote[]) => {
    setEvents((prevValue) => [...prevValue, getLogText('topOfBookUpdated', quotes)]);
  }

  const onOrderBookSnapshot = (orderBook: OrderBook) => {
    setEvents((prevValue) => [...prevValue, getLogText('onOrderBookSnapshot', orderBook)]);
  }

  const onOrderBookUpdated = (orderBook: OrderBook) => {
    setEvents((prevValue) => [...prevValue, getLogText('orderBookUpdated', orderBook)]);
  }

  const onOrderUpdated = (order: Order) => {
    setEvents((prevValue) => [...prevValue, getLogText('orderUpdated', order)]);
  }

  useEffect(() => {
    atomex.authorization.events.authorized.addListener(onAuthorized);
    atomex.authorization.events.unauthorized.addListener(onUnauthorized);
    atomex.authorization.events.authTokenExpiring.addListener(onAuthTokenExpiring);
    atomex.authorization.events.authTokenExpired.addListener(onAuthTokenExpired);
    atomex.exchangeManager.events.topOfBookUpdated.addListener(onTopOfBookUpdated);
    atomex.exchangeManager.events.orderBookSnapshot.addListener(onOrderBookSnapshot);
    atomex.exchangeManager.events.orderBookUpdated.addListener(onOrderBookUpdated);
    atomex.exchangeManager.events.orderUpdated.addListener(onOrderUpdated);

    return () => {
      atomex.authorization.events.authorized.removeListener(onAuthorized);
      atomex.authorization.events.unauthorized.removeListener(onUnauthorized);
      atomex.authorization.events.authTokenExpiring.removeListener(onAuthTokenExpiring);
      atomex.authorization.events.authTokenExpired.removeListener(onAuthTokenExpired);
      atomex.exchangeManager.events.topOfBookUpdated.removeListener(onTopOfBookUpdated);
      atomex.exchangeManager.events.orderBookSnapshot.removeListener(onOrderBookSnapshot);
      atomex.exchangeManager.events.orderBookUpdated.removeListener(onOrderBookUpdated);
      atomex.exchangeManager.events.orderUpdated.removeListener(onOrderUpdated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = events.reduce((prevResult, currentValue, index) => `${currentValue}${index !== 0 ? '\n\n' : ''}${prevResult}`, '');

  return <div className="atomex-events">
    <span>Events</span>
    <textarea className="atomex-events__textarea" readOnly value={text}></textarea>
  </div>
}
