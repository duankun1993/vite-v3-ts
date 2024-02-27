import { ethers } from "ethers";
import { get_account_address,switchover_network } from "./index";
const CHAIN = import.meta.env.VITE_CHAIN_ID;
export async function connect_metamask() {
    return new Promise(async (resolve, reject) => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // 校验以太坊网络
            const { chainId } = await provider._networkPromise;
            
            if (chainId != CHAIN) {
                alert("The current network is not the target test network Sepolia, please switch to Sepolia and try again.");
                await switchover_network();
                return;
            }
            const address = await get_account_address(provider);
            if (address) {
                resolve(address)
            } else {
                reject("Please connect to MetaMask!");
            }
        } else {
            reject("Please install MetaMask!");
        }
    })
}
connect_metamask().then(address => {
    console.log(address);
})