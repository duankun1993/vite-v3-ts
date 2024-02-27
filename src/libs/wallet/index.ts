import { ethers } from "ethers";

/**
 * 获取账户地址
 * @param provider Web3Provider
 * @returns 账户地址
 */
export async function get_account_address(provider: ethers.providers.Web3Provider): Promise<string> {
    // 获取账户地址
    const accounts = await provider.send("eth_requestAccounts", []);
    const address = accounts[0];
    return address;
}


/**
 * 切换以太坊网络
 */
export async function switchover_network() {
    try {
        // 定义网络配置
        const network = {
            chainId: "0xaa36a7", // Ropsten 测试网络的 chainId
            chainName: "Sepolia",
            nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18
            },
            rpcUrls: ["https://sepolia.infura.io/v3/df3af6e2414b4c23a7b33864d17baa88"],
            blockExplorerUrls: ["https://ropsten.etherscan.io/"]
        };
        // 请求添加以太坊链
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [network]
        });
        // 刷新页面
        location.reload();
    } catch (error) {
        // 网络切换失败，打印错误信息
        console.error("网络切换失败: ", error);
    }
}