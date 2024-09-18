import {arbitrum, sepolia, arbitrumSepolia} from "wagmi/chains";

export const getChain = (chainId: number) => {
    for (const chain of Object.values([sepolia, arbitrum, arbitrumSepolia])) {
        if (chain.id === chainId) {
            return chain;
        }
    }

    return null;
}

export const getEtherscanUrl = (address: string) => {

    return `https://sepolia.arbiscan.io/address/${address}`;
}
