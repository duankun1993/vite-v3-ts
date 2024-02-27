import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee } from "@cosmjs/stargate";
import { coins } from "@cosmjs/launchpad";

let cosmWasmClient: SigningCosmWasmClient;

/**
 * nibiru deposit
 * @returns address
 */
export const deposit_with_nibiru = async () => {
    let { address, CosmWasmClient }: NibiruConnect = await connect_wallet();
    if (CosmWasmClient && address) {
        cosmWasmClient = CosmWasmClient!;
        console.log("Connected wallet", address);
        const exampleAddress = "nibi17dz4cdw5fmm2cxd4ht9xvjmpw3ycmpkpcc6js9"
        await cosmosSendToken(address, exampleAddress, 0.2, 'unibi');
        return address
    }
}

type NibiruConnect = {
    address?: string,
    CosmWasmClient?: SigningCosmWasmClient
}

// Connect to wallet and return address and CosmWasmClient instance
async function connect_wallet(): Promise<NibiruConnect> {
    if (!window.keplr) {
        alert("Please install keplr extension");
        return {};
    }
    let chainId = "nibiru-testnet-1";

    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);

    const rpc = "https://rpc.testnet-1.nibiru.fi";

    const accounts = await offlineSigner.getAccounts();
    const CosmWasmClient = await SigningCosmWasmClient.connectWithSigner(rpc, offlineSigner);
    return { address: accounts[0].address, CosmWasmClient };
}

/**
 * 转账
 * @param from 用户地址
 * @param to 收款地址
 * @param amount 转账金额
 * @param denom 代币单位
 * @returns 
 */
async function cosmosSendToken(from: string, to: string, amount: number, denom: string) {
    const gas = "0.025" + denom;
    const fee = calculateFee(100_000, gas);
    console.log("fee: " + fee);
    amount = amount * 1000000;
    debugger
    const tx = await cosmWasmClient.sendTokens(from, to, coins(amount, denom), fee);
    console.log("tx = ", tx);
    return tx;
}
