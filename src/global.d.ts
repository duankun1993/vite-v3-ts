interface Number {
    mul(arg: number): number;
}

interface Window {
    ethereum?: any;
    keplr?: any;
    getOfflineSigner: (chainId: string) => any;
}
