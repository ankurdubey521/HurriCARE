import { ERC20_ABI } from "../Abi/erc20abi";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
const SuperfluidSDK = require("@superfluid-finance/js-sdk");

const F_DAI_X_ADDRESS_GOERLI = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

const getSuperfluidSdk = async () => {
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
  });
  await sf.initialize();
  console.log("Initialized Superfluid SDK");
  return sf;
};

const getFDaiXBalance = async (address) => {
  const signer = new Web3Provider(window.ethereum).getSigner();
  const contract = new ethers.Contract(
    F_DAI_X_ADDRESS_GOERLI,
    ERC20_ABI,
    signer
  );
  return (await contract.balanceOf(address)).toString();
};

const startFlowFDaiX = async (
  flowRate,
  senderAddress,
  recipientAddress,
  sf
) => {
  const user = sf.user({
    address: senderAddress,
    token: F_DAI_X_ADDRESS_GOERLI,
  });
  await user.flow({
    recipient: recipientAddress,
    flowRate,
  });
  console.log(await user.details());
};

export { getSuperfluidSdk, getFDaiXBalance, startFlowFDaiX };
