import { Web3Provider } from "@ethersproject/providers";
const SuperfluidSDK = require("@superfluid-finance/js-sdk");

const getSuperfluidSdk = async () => {
  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
  console.log(`Found wallet address: ${walletAddress}`);
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
  });
  await sf.initialize();
  console.log("Initialized Superfluid SDK");
  return sf;
};

export default getSuperfluidSdk;
