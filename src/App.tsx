import { useEffect, useState } from "react";
import "./App.css";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { initWallet } from "./App.scripts";

function App() {
  const [provider, setProvider] = useState<InstanceType<
    typeof EthereumProvider
  > | null>(null);

  const handleInit = async () => {
    const provider = await initWallet();
    if (provider) {
      // await provider.connect();
      const accounts = await provider.enable();
      console.log(accounts);
      setProvider(provider);
    }
  };

  const handleAccounts = async () => {
    if (!provider) return console.log(provider);
    const result = await provider.request({ method: "eth_requestAccounts" });
    console.log(result);
  };

  useEffect(() => {
    console.log(provider);
  }, [provider]);

  return (
    <>
      <button onClick={handleInit}>Connect wallet</button>
      <br />
      <button onClick={handleAccounts}>Request Accounts</button>
    </>
  );
}

export default App;
