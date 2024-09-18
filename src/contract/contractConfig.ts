import BicFactory from './abi/BicFactory.json';
import BicRedeemFactory from './abi/BicRedeemFactory.json';
import BicRedeemToken from './abi/BicRedeemToken.json';
import BicTokenPaymaster from './abi/BicTokenPaymaster.json';
import HandleController from './abi/HandleController.json';
import Handle from './abi/Handle.json';
import {createPublicClient, getContract} from "viem";
import {sepolia, arbitrumSepolia} from "wagmi/chains";
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
    address: process.env.NEXT_PUBLIC_BIC_TOKEN_PAYMASTER_ADDRESS as `0x${string}`,
    abi: BicTokenPaymaster
}

export const HandleControllerConfig = {
    address: process.env.NEXT_PUBLIC_HANDLE_CONTROLLER_ADDRESS as `0x${string}`,
    abi: HandleController
}

export const HandleConfig = (address: `0x${string}`) => ({
    address: address as `0x${string}`,
    abi: Handle
})



export const client = createPublicClient({
    chain: arbitrumSepolia,
    transport: http()
})


