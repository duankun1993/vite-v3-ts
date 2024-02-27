
import { ethers } from "ethers";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { get_account_address } from ".";
import { daiAbi } from "./abi";

const chain_network = import.meta.env.VITE_CHAIN_ID;
const rpc = import.meta.env.VITE_RPC_URL;
const USDC_ADDRESS = import.meta.env.VITE_USDC_ADDRESS;

let provider: ethers.providers.Web3Provider | null = null;
let ethereum:unknown = null;
let coinbaseWallet = null;


/**
 * 连接 Coinbase Wallet
 * @returns {Promise<string>} Coinbase Wallet 的账户地址
 */
export function connect_coinbase(): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            // 创建 Coinbase Wallet SDK 实例
            coinbaseWallet = new CoinbaseWalletSDK({
                appName: 'PlayEstates',
                appLogoUrl: "https://www.playestates.com/img/logo.521986b5.png",
                darkMode: false
            });
            
            // 创建 Ethereum Web3 提供者
            ethereum = coinbaseWallet.makeWeb3Provider(rpc, chain_network)
            // 创建以太坊 Web3 提供者
            provider = new ethers.providers.Web3Provider(ethereum as any);
            // 获取账户地址
            const account = await get_account_address(provider);
            resolve(account);
        } catch (err) {
            reject(err);
        }
    })
}


type DepositParams = {
    amount: string,
    userAddressList: string[],
    success: Function,
    error: Function
}


export function deposit_with_coinbase(params: DepositParams) {
    connect_coinbase().then(async (accounts) => {
        let signer = provider!.getSigner();
        console.log(accounts);
        
        const address = accounts.toLocaleLowerCase();
        if (!params.userAddressList.includes(address)) {
            return params.error('Incorrect wallet address. Please go and bind your wallet address in the user profile.')
        }
        const tradeContract = new ethers.Contract(USDC_ADDRESS, daiAbi, signer);
        // 收款地址
        const to = import.meta.env.VITE_PE_WALLET_ADDRESS;
        const value = ethers.BigNumber.from(params.amount).mul(ethers.BigNumber.from(10).pow(6)).toString();
        try {
            await tradeContract.callStatic.transfer(to, value);
            const res = await tradeContract.transfer(to, value);
            params.success({ hash: res.hash, provider });
        } catch (error) {
            const errorMsg = throwError(error, "Transfer failed!");
            params.error(errorMsg)
        }
    }).catch((err) => {
        const message = err.reason || err.message
        params.error(message);
    })
}

export function throwError(err: any, _msg:string) {
    if (err.reason) {
        const def = "missing revert data in call exception; Transaction reverted without a reason string";
        if (err.reason === def) return "insufficient funds for gas";
        else return err.reason;
    }
    if (err.message) return err.message;
    return _msg;
}

// deposit_with_coinbase({
//     amount: '10',
//     'userAddressList': ['0xa4680514d527c0efec844edc44ffc3a27771ba44'],
//     'success': (res: any) => {
//         console.log(res)
//     },
//     'error': (err:any) => {
//         console.log(err)
//     }
// })