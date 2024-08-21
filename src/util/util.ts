import {arbitrum, sepolia} from "wagmi/chains";

export const getChain = (chainId: number) => {
    for (const chain of Object.values([sepolia, arbitrum])) {
        if (chain.id === chainId) {
            return chain;
        }
    }

    return null;
}
