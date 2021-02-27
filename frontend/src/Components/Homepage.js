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
  var options1 = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    var latitude = crd.latitude.toString();
    var longitude = crd.longitude.toString();
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    // console.log(`Altitude ${crd.altitude} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  const getLocation = async() =>{
    if (navigator.geolocation){
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success,error,options1);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    }
  }
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
      <button onClick={() => { getLocation()}}> getLOx
      </button>

     
    </>
  );
};

export default Homepage;
