import BigNumber from "bignumber.js";
import { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "../appContext";

export const Exchange = () => {
  const { atomex } = useContext(AppContext);

  const fromCurrencies = ['ETH', 'XTZ'];
  const [fromCurrency, setFromCurrency] = useState(fromCurrencies[0]);
  const [fromAmount, setFromAmount] = useState('');

  const toCurrencies = ['XTZ', 'ETH'];
  const [toCurrency, setToCurrency] = useState(toCurrencies[0]);
  const [toAmount, setToAmount] = useState('');

  const [isFromAmount, setIsFromAmount] = useState(true);
  const [useWatchTower, setUseWatchTower] = useState(true);

  const getSwapPreview = async (isFromAmount: boolean, amount: BigNumber) => {
    setIsFromAmount(isFromAmount);
    if (isFromAmount)
      setFromAmount(amount.toString())
    else
      setToAmount(amount.toString())

    const preview = await atomex.getSwapPreview({
      type: 'SolidFillOrKill',
      from: fromCurrency,
      to: toCurrency,
      isFromAmount,
      amount: amount as any,
      useWatchTower
    });

    console.log(JSON.stringify(preview, undefined, '  '));

    return preview;
  };

  const handleFromAmountChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+event.target.value))
      return;

    const preview = await getSwapPreview(true, new BigNumber(event.target.value));
    setToAmount(preview.to.actual.amount.toString());
  }

  const handleToAmountChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+event.target.value))
      return;

    const preview = await getSwapPreview(false, new BigNumber(event.target.value));
    setFromAmount(preview.from.actual.amount.toString());
  }

  const handleFromCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const fromCurrency = event.target.value;
    setFromCurrency(fromCurrency);
    if (fromCurrency === toCurrency)
      setToCurrency(toCurrencies.filter(c => c !== fromCurrency)[0]);
  };

  const handleToCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const toCurrency = event.target.value;
    setToCurrency(toCurrency);
    if (toCurrency === fromCurrency)
      setFromCurrency(fromCurrencies.filter(c => c !== toCurrency)[0]);
  };

  const handleExchangeClick = async () => {
    //const swapPreview = await getSwapPreview(isFromAmount, new BigNumber(isFromAmount ? fromAmount : toAmount));
    //const swap = await atomex.swap({ swapPreview });
    //console.log(JSON.stringify(swap, undefined, '  '));

    //const protocol = atomex.atomexContext.providers.blockchainProvider.getCurrencyInfo(fromCurrency)?.atomexProtocol;
  };

  return <div>
    <select value={fromCurrency} onChange={handleFromCurrencyChange}>
      {fromCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
    <input name="from" type="number" value={fromAmount} onChange={handleFromAmountChange}></input><br />

    <select value={toCurrency} onChange={handleToCurrencyChange}>
      {toCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
    <input name="to" type="number" value={toAmount} onChange={handleToAmountChange}></input><br />

    <button onClick={handleExchangeClick}>Exchange</button>
  </div>
};