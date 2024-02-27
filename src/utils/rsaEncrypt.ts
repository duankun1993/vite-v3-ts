import { pki } from "node-forge";
/**
 * rsa加密
 * @param data 数据
 * @returns 加密过后的数据
 */
export function rsaEncrypt(data:string) {
    // 定义公钥
    const pemStr = `-----BEGIN RSA PUBLIC KEY-----
            MIIBCgKCAQEAsJfF5FE/B7RbssuKJae+MsWQ8BUJVYR9W4cz7VBBo6gBcV2jHviA
            B53r2gDQ+oTL7SDYmNtaGOX7Q6OoSKRm3eFHDM44HeGgdyRiLNNsnSeMAOGDJ9Yx
            PmLhbQwfYEjbntVcK18dLPsTFcOuPCvOeajXSvbsZVEidRPL+PNDJ+iiz5tDan0d
            v4wtD3zAvWD2nK97fuu6Guo3CCgIf9f2aPWEDxBlNOKb7IBeQDTp9ZKuya2lJtzT
            tBuREPcF2P/QYW7yo+54sLB9/Xn9W/bbiY07SOPOByRYSyyQV/B09VF0lTEn5ps6
            l/oG7yxiVBFqLx6XxkTr3/mtdE4aKCwchwIDAQAB
                    -----END RSA PUBLIC KEY-----`;
    let publicKey = pki.publicKeyFromPem(pemStr);
    // 获取到rsa加密结果
    let encrypted = publicKey.encrypt(data, 'RSAES-PKCS1-V1_5');
    // rsa加密后转base64
    return window.btoa(encrypted);
}