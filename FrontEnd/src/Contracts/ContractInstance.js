import { ethers } from "ethers";

export default function getContractInstance(abi, contractAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const Contract = new ethers.Contract(contractAddress, abi, signer);
  return Contract;
}
