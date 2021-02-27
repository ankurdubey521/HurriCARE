import React, { useState, useEffect } from "react";
import Titlebar from "./Titlebar";
import {
  getSuperfluidSdk,
  getFDaiXBalance,
  startFlowFDaiX,
} from "../utils/superfluid";
import { useWeb3React } from "@web3-react/core";

const DEPLOYED_CONTRACT_ADDRESS_GOERLI =
  "0xd53fB492eD4136eCD712d2a38ed38f49470436e2";
const Homepage = () => {
  const { account } = useWeb3React();
  const [superFluidFramerwork, setSuperFluidFramerwork] = useState(undefined);
  const [fDaiXBalance, setFDaiXBalance] = useState(0);
  const [flowRateInput, setFlowRateInput] = useState(0);

  const initializeSuperfluidData = async () => {
    // Initialize Superfluid Framwework
    setSuperFluidFramerwork(await getSuperfluidSdk());

    // Fetch fDAIx Balance
    setFDaiXBalance(await getFDaiXBalance(account));
  };

  useEffect(() => {
    initializeSuperfluidData()
      .then(() => {})
      .catch(console.log);
  }, [account]);

  return (
    <>
      <Titlebar /> <div>Homepage</div>
      Current fDaiX Balance: {fDaiXBalance}
      <br />
      <input
        type="number"
        value={flowRateInput}
        onChange={(event) => setFlowRateInput(event.target.value)}
      />
      <button
        onClick={() => {
          startFlowFDaiX(
            flowRateInput,
            account,
            DEPLOYED_CONTRACT_ADDRESS_GOERLI,
            superFluidFramerwork
          ).then(() => {});
        }}
      >
        Start Streaming money to contract
      </button>
    </>
  );
};

export default Homepage;
