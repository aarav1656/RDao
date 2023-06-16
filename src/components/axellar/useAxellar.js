import { ethers } from "ethers";
import {
  AxelarQueryAPI,
  Environment,
  CHAINS,
  AxelarGMPRecoveryAPI,
  GMPStatus,
  GasPaidStatus,
} from "@axelar-network/axelarjs-sdk";


import usdcAbi from "../../abis/POLUSDC.json";
// import fvmAbi from "../abis/axelar/fvm.json";
//import ethAbi from "../abis/axelar/eth.json";
// usdc abi shall remain same
import polyAbi from "../../abis/SendPoly.json";

const FVM_USDC_ADDRESS = "0x254d06f33bDc5b8ee05b2ea472107E300226659A";
const AVALANCHE_CONTRACT_ADDRESS = "0x8b24F9805c44B505319F681130E199c97fbD58d4";

const POL_CONTRACT_ADDRESS = "0xbFDc57CE8CBCb4202826ea3c462f0a938D39d3e2";
const POL_USDC_ADDRESS = "0x2c852e740B62308c46DD29B982FBb650D063Bd07";
const api = new AxelarQueryAPI({ environment: Environment.TESTNET });
const sdk = new AxelarGMPRecoveryAPI({
  environment: Environment.TESTNET,
});
async function waitForTransaction(provider, txnHash) {
  let receipt = await provider.waitForTransaction(txnHash, 1);

  return receipt;
}

const useAxelar = () => {

  async function execute({ amount, receiver , symbol }) {

    const payload = ethers.utils.defaultAbiCoder.encode(
      ["address[]", "uint256"],
      [[receiver], amount]
    );
    await console.log(receiver, payload, "receiver");
  
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    let signer = provider.getSigner();

    // initialize contracts using address and ABI
    const fvmUSDC = new ethers.Contract(FVM_USDC_ADDRESS, usdcAbi, signer);
    const polyUSDC = new ethers.Contract(POL_USDC_ADDRESS, usdcAbi, signer);
    // const fvmContract = new ethers.Contract(
    //   FVM_CONTRACT_ADDRESS,
    //   fvmAbi,
    //   signer
    // );

    const polyContract = new ethers.Contract(
      POL_CONTRACT_ADDRESS,
      polyAbi,
      signer
    );
    // set the recipient address
    //const receiver = await signer.getAddress();

    // STEP 1: Allow the FVM contract to spend USDC on your behalf
    // const fvmUSDCWithSigner = fvmUSDC.connect(signer);
    // const approveTx = await fvmUSDCWithSigner.approve(
    //   FVM_CONTRACT_ADDRESS,
    //   amount
    // );
    // const approveTxReceipt = await waitForTransaction(provider, approveTx.hash);
    // console.log("ApproveTxReceipt: ", approveTxReceipt);

    // allow the poly to spend USDC on your behalf
    const polyAbiWithSigner = polyUSDC.connect(signer);
    const approveTxPoly = await polyAbiWithSigner.approve(
      POL_CONTRACT_ADDRESS,
      amount
    );
    const approveTxReceiptPoly = await waitForTransaction(provider, approveTxPoly.hash);
    console.log("ApproveTxReceipt: ", approveTxReceiptPoly);

    // STEP 2: Call the POL contract to send aUSDC to the Axelar network
    const fee = await api.estimateGasFee(
      CHAINS.TESTNET["POLYGON"],
      CHAINS.TESTNET["AVALANCHE"],
      "aUSDC"
    );
    console.log("Fee: ", fee);

    const polyContractWithSigner = polyContract.connect(signer);
    const sendTx = await polyContractWithSigner.sendToMany(
      "Avalanche",
      AVALANCHE_CONTRACT_ADDRESS,
      payload,
      symbol,
      amount,
      {
        value: fee,
      }
    );
    const sendTxReceipt = await waitForTransaction(provider, sendTx.hash);
    console.log("SendTxReceipt: ", sendTxReceipt);

    // STEP 3: Query the Axelar network for the transaction status
    console.log(
      "View Status At: https://testnet.axelarscan.io/gmp/" + sendTx.hash
    );
    let txStatus = await sdk.queryTransactionStatus(sendTx.hash);
    while (txStatus.status !== GMPStatus.DEST_EXECUTED) {
      console.log(
        "Tx Status: ",
        txStatus.status,
        "\nGas Status: ",
        txStatus.gasPaidInfo?.status ?? GasPaidStatus.GAS_UNPAID
      );
      txStatus = await sdk.queryTransactionStatus(sendTx.hash);
      if (txStatus.error) {
        console.error("Error: ", txStatus.error);
        break;
      }
    }
    console.log(
      "Tx Status: ",
      txStatus.status,
      "\nGas Status: ",
      txStatus.gasPaidInfo?.status ?? GasPaidStatus.GAS_UNPAID
    );
    console.log(
      "Funding completed with tx hash ",
        txStatus.executed.transactionHash
    );
  }

  return { execute };
};

export default useAxelar;