import {formatEther, pad, parseEther} from "viem";
import {useEffect, useState} from "react";
import {BicFactoryConfig, BicRedeemFactoryConfig, BicRedeemTokenConfig, client} from "@/contract/contractConfig";

const distributedPlan = [
    {
        id: 1,
        pool: 'Founding Community',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_FOUNDING_COMMUNITY_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('1650000000'),
        isDeployed: false,
    },
    {
        id: 2,
        pool: 'Core Team',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_CORE_TEAM_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('400000000'),
        isDeployed: false,
    },
    {
        id: 3,
        pool: 'Strategic partner',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_STRATEGIC_PARTNER_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('150000000'),
        isDeployed: false,
    },
    {
        id: 4,
        pool: 'Private VC Deals',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_PRIVATE_VC_DEALS_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('500000000'),
        isDeployed: false,
    },
    {
        id: 5,
        pool: 'Airdrop Campaigns',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_AIRDROP_CAMPAIGNS_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('250000000'),
        isDeployed: false,
    },
    {
        id: 6,
        pool: 'Community and Ecosystem Development',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_COMMUNITY_AND_ECOSYSTEM_DEVELOPMENT_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('300000000'),
        isDeployed: false,
    },
    {
        id: 7,
        pool: 'Operations Fund',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_OPERATIONS_FUND_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('500000000'),
        isDeployed: false,
    },
    {
        id: 8,
        pool: 'Liquidity and Exchange Reserves',
        unlockAddress: null,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('250000000'),
        isDeployed: false,
    },
    {
        id: 9,
        pool: 'Foundation Reserve',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_FOUNDATION_RESERVE_UNLOCK_ADDRESS,
        lockAddress: null,
        lockAmount: 0,
        total: parseEther('1000000000'),
        isDeployed: false,
    }
]

export default function DistributedPanel() {
    const [plan, setPlan] = useState(distributedPlan)

    useEffect(() => {
        sync().catch(console.error)
    }, [])

    async function sync() {
        const bicRedeemTokenImpl = await client.readContract({...BicRedeemFactoryConfig, functionName: 'bicRedeemImplementation'})
        console.log('bicRedeemTokenImpl: ', bicRedeemTokenImpl)
        for (let i = 0; i < distributedPlan.length; i++) {
            const pool = distributedPlan[i]
            if(pool.unlockAddress) {
                const lockAddress = await client.readContract({...BicFactoryConfig, functionName: 'computeProxyAddress', args: [bicRedeemTokenImpl, pad(pool.unlockAddress, { size: 32 }) ]})
                console.log('lockAddress: ', lockAddress)
                pool.lockAddress = lockAddress
                const lockCode = await client.getCode({address: lockAddress})
                console.log('lockCode: ', lockCode)
                if(lockCode) {
                    pool.isDeployed = true
                }

            }
            // const lockAddress = await BicRedeemFactory.bicRedeemFactory.getLockAddress(pool.id)
        }
        setPlan([...distributedPlan])
    }

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Pool</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Lock remain</th>
                <th scope="col" className="px-6 py-3">Total</th>
            </tr>
            </thead>
            <tbody>
            {plan.map(e => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{e.id}</td>
                    <td className="px-6 py-4">{e.pool}</td>
                    <td className="px-6 py-4">
                        {e.unlockAddress ? <><a className="lnk-primary" target="_blank" rel="noopener noreferrer"
                                                href={"https://sepolia.etherscan.io/address/" + e.lockAddress}>Locked</a>
                            <br/>
                            <a className="lnk-primary" target="_blank" rel="noopener noreferrer"
                               href={"https://sepolia.etherscan.io/address/" + e.unlockAddress}>Unlocked</a></> : 'N/A'}
                    </td>
                    <td className="px-6 py-4">{e.lockAddress ? e.isDeployed ?
                            e.lockAmount :
                            <button className="btn-primary">Create lock pool</button> :
                        'N/A'
                    }</td>
                    <td className="px-6 py-4">{formatEther(e.total)}</td>
                    <td className="px-6 py-4">
                        <button className="btn-primary">Detail</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
