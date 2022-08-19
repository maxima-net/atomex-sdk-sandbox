import { Atomex } from "atomex-sdk/development";

export const getTokenBalance = async (atomex: Atomex, tokenId: string, accountAddress: string) => {
  const blockchainProvider = atomex.atomexContext.providers.blockchainProvider
  const balanceProvider = blockchainProvider.getCurrencyInfo(tokenId)?.balanceProvider;

  return await balanceProvider?.getBalance(accountAddress);
}