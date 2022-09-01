import { Atomex } from "atomex-sdk/development"

export const getPrices = async (atomex: Atomex) => {
  const priceManager = atomex.atomexContext.managers.priceManager;
  console.log('ratesProvider.getAvailableServices(): ', priceManager.getAvailableProviders())

  console.log(`ratesProvider.getPrice('BTC', 'XTZ', 'binance'): `, (await priceManager.getPrice({ baseCurrency: 'BTC', quoteCurrency: 'XTZ', provider: 'binance' }))?.toString(10));
  console.log(`ratesProvider.getPrice('BTC', 'XTZ', 'kraken'): `, (await priceManager.getPrice({ baseCurrency: 'BTC', quoteCurrency: 'XTZ', provider: 'kraken' }))?.toString(10));
  console.log(`ratesProvider.getPrice('BTC', 'XTZ', 'atomex'): `, (await priceManager.getPrice({ baseCurrency: 'BTC', quoteCurrency: 'XTZ', provider: 'atomex' }))?.toString(10));
  console.log(`ratesProvider.getPrice('BTC', 'XTZ'): `, (await priceManager.getPrice({ baseCurrency: 'BTC', quoteCurrency: 'XTZ' }))?.toString(10));
  console.log(`ratesProvider.getAveragePrice('BTC', 'XTZ'): `, (await priceManager.getAveragePrice({ baseCurrency: 'BTC', quoteCurrency: 'XTZ' }))?.toString(10));

  console.log('----');

  console.log(`ratesProvider.getPrice('XTZ', 'USD', 'binance'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USD', provider: 'binance' }))?.toString(10));
  console.log(`ratesProvider.getPrice('XTZ', 'USD', 'kraken'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USD', provider: 'kraken' }))?.toString(10));
  console.log(`ratesProvider.getPrice('XTZ', 'USD', 'atomex'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USD', provider: 'atomex' }))?.toString(10));
  console.log(`ratesProvider.getPrice('XTZ', 'USD'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USD' }))?.toString(10));
  console.log(`ratesProvider.getAveragePrice('XTZ', 'USD'): `, (await priceManager.getAveragePrice({ baseCurrency: 'XTZ', quoteCurrency: 'USD' }))?.toString(10));

  console.log('----');

  console.log(`ratesProvider.getPrice('XTZ', 'USDT', 'binance'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USDT', provider: 'binance' }))?.toString(10));
  console.log(`ratesProvider.getPrice('XTZ', 'USDT', 'kraken'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USDT', provider: 'kraken' }))?.toString(10));
  console.log(`ratesProvider.getPrice('XTZ', 'USDT', 'atomex'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USDT', provider: 'atomex' }))?.toString(10));
  console.log(`ratesProvider.getPrice('XTZ', 'USDT'): `, (await priceManager.getPrice({ baseCurrency: 'XTZ', quoteCurrency: 'USDT' }))?.toString(10));
  console.log(`ratesProvider.getAveragePrice('XTZ', 'USDT'): `, (await priceManager.getAveragePrice({ baseCurrency: 'XTZ', quoteCurrency: 'USDT' }))?.toString(10));

  console.log('----');

  console.log(`ratesProvider.getPrice('USDT', 'XTZ', 'binance'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'XTZ', provider: 'binance' }))?.toString(10));
  console.log(`ratesProvider.getPrice('USDT', 'XTZ', 'kraken'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'XTZ', provider: 'kraken' }))?.toString(10));
  console.log(`ratesProvider.getPrice('USDT', 'XTZ', 'atomex'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'XTZ', provider: 'atomex' }))?.toString(10));
  console.log(`ratesProvider.getPrice('USDT', 'XTZ'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'XTZ' }))?.toString(10));
  console.log(`ratesProvider.getAveragePrice('USDT', 'XTZ'): `, (await priceManager.getAveragePrice({ baseCurrency: 'USDT', quoteCurrency: 'XTZ' }))?.toString(10));

  console.log('----');

  console.log(`ratesProvider.getPrice('USDT', 'USD', 'binance'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'USD', provider: 'binance' }))?.toString(10));
  console.log(`ratesProvider.getPrice('USDT', 'USD', 'kraken'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'USD', provider: 'kraken' }))?.toString(10));
  console.log(`ratesProvider.getPrice('USDT', 'USD', 'atomex'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'USD', provider: 'atomex' }))?.toString(10));
  console.log(`ratesProvider.getPrice('USDT', 'USD'): `, (await priceManager.getPrice({ baseCurrency: 'USDT', quoteCurrency: 'USD' }))?.toString(10));
  console.log(`ratesProvider.getAveragePrice('USDT', 'USD'): `, (await priceManager.getAveragePrice({ baseCurrency: 'USDT', quoteCurrency: 'USD' }))?.toString(10));

  console.log('----');

  console.log(`atomex.convertCurrency(1, 'XTZ', 'USDT'): `, (await atomex.convertCurrency(1, 'XTZ', 'USDT'))?.toString(10));
  console.log(`atomex.convertCurrency(1, 'XTZ', 'USD'): `, (await atomex.convertCurrency(1, 'XTZ', 'USD'))?.toString(10));
  console.log(`atomex.convertCurrency(1, 'BTC', 'XTZ'): `, (await atomex.convertCurrency(1, 'BTC', 'XTZ'))?.toString(10));
  console.log(`atomex.convertCurrency(1, 'BTC', 'ETH'): `, (await atomex.convertCurrency(1, 'BTC', 'ETH'))?.toString(10));
}