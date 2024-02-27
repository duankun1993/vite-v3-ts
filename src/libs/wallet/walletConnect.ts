import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";
import { get_account_address } from "./index";

const CHAIN = import.meta.env.VITE_CHAIN_ID;
const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
// let ethereumProvider_native = null;
let walletProvider: ethers.providers.Web3Provider | null = null; // 声明 walletProvider 变量

/**
 * 连接walletconnect
 * @param onOpen 弹窗打开时回调
 * @param onSuccess 链接成功时回调
 * @param onDisconnect 断开连接回调
 */
export async function connectWalletConnect(onOpen: Function, onSuccess: Function, onDisconnect?: Function) {
    const chains = [CHAIN];
    const projectId: string = walletConnectProjectId;
    try {
        const ethereumProvider = await EthereumProvider.init({
            projectId: projectId,
            chains: chains,
            showQrModal: true,
            methods: ["eth_sendTransaction", "personal_sign"],
            events: ["chainChanged", "accountsChanged"]
        } as any);

        // ethereumProvider_native = ethereumProvider;
        ethereumProvider.on("connect", async () => {
            
            // ethers
            const WalletProvider = new ethers.providers.Web3Provider(ethereumProvider);
            walletProvider = walletProvider ? walletProvider : WalletProvider;
            const provider = walletProvider ? walletProvider : new ethers.providers.Web3Provider(window.ethereum);

            const userAddress = await get_account_address(provider);
            onSuccess && onSuccess(userAddress, WalletProvider);
        });
        ethereumProvider.on("display_uri", () => {
            onOpen && onOpen();
        });
        ethereumProvider.on("disconnect", () => {
            onDisconnect && onDisconnect();
        });
        ethereumProvider.connect();
    } catch (error) {
        console.error(error);
    }
}
// connectWalletConnect(() => {
//     console.log("open wallet connect");
    
// }, (userAddress:string) => {
//     console.log("success wallet connect", userAddress);
    
// })
