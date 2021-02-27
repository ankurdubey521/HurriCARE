import { Web3Provider } from "@ethersproject/providers";
const SuperfluidSDK = require("@superfluid-finance/js-sdk");

const getSuperfluidSdk = async () => {
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
  });
  await sf.initialize();
  console.log("Initialized Superfluid SDK");
  return sf;
};

export default getSuperfluidSdk;
