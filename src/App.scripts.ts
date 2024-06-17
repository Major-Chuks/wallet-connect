import { EthereumProvider } from "@walletconnect/ethereum-provider";

export const initWallet = async () => {
  const handler = (e: unknown) => {
    console.log(e);
  };

  const provider = await EthereumProvider.init({
    projectId: "736a178c6aa509eb2ea6c2e2b45803b6",
    metadata: {
      name: "My Website",
      description: "My Website Description",
      url: "https://orki.vercel.app",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    showQrModal: true,
    optionalChains: [1, 137, 2020],
  });
  // chain changed
  provider.on("chainChanged", handler);
  // accounts changed
  provider.on("accountsChanged", handler);
  // session established
  provider.on("connect", handler);
  // session event - chainChanged/accountsChanged/custom events
  provider.on("session_event", handler);
  // connection uri
  provider.on("display_uri", handler);
  // session disconnected from the wallet - this won't be called when the disconnect function is called from the dapp.
  provider.on("disconnect", handler);

  return provider;
};
