import React from "react";
import { Portis, Injected } from "../utils/web3-connectors";
import { useWeb3React } from "@web3-react/core";

const Titlebar = () => {
  const web3data = useWeb3React();
  return (
    <div>
      <button onClick={() => web3data.activate(Injected)}>
        Activate Metamask
      </button>

      <button onClick={() => web3data.activate(Portis)}>Activate Portis</button>

      <pre>Current Web3 Data: {JSON.stringify(web3data)}</pre>
    </div>
  );
};

export default Titlebar;
