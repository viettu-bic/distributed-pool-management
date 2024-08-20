import BicFactory from './abi/BicFactory.json';
import BicRedeemFactory from './abi/BicRedeemFactory.json';
import BicRedeemToken from './abi/BicRedeemToken.json';
import BicTokenPaymaster from './abi/BicTokenPaymaster.json';
import {createPublicClient} from "viem";
import {sepolia} from "wagmi/chains";
import {http} from "wagmi";

export const BicFactoryConfig = {
    address: process.env.NEXT_PUBLIC_BIC_FACTORY_ADDRESS,
    abi: BicFactory
}

export const BicRedeemFactoryConfig = {
    address: process.env.NEXT_PUBLIC_BIC_REDEEM_FACTORY_ADDRESS,
    abi: BicRedeemFactory
}

export const BicRedeemTokenConfig = (address: string) => ({
    address: address,
    abi: BicRedeemToken
})

export const BicTokenPaymasterConfig = {
    address: process.env.NEXT_PUBLIC_BIC_TOKEN_PAYMASTER_ADDRESS,
    abi: BicTokenPaymaster
}


export const client = createPublicClient({
    chain: sepolia,
    transport: http()
})
