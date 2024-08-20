import {formatEther, pad, parseEther} from "viem";
import {useEffect} from "react";
import {BicFactoryConfig, BicRedeemFactoryConfig, BicRedeemTokenConfig, client} from "@/contract/contractConfig";

const distributedPlan = [
    {
        id: 1,
        pool: 'Founding Community',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_FOUNDING_COMMUNITY_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('1650000000')
    },
    {
        id: 2,
        pool: 'Core Team',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_CORE_TEAM_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('400000000')
    },
    {
        id: 3,
        pool: 'Strategic partner',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_STRATEGIC_PARTNER_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('150000000')
    },
    {
        id: 4,
        pool: 'Private VC Deals',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_PRIVATE_VC_DEALS_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('500000000')
    },
    {
        id: 5,
        pool: 'Airdrop Campaigns',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_AIRDROP_CAMPAIGNS_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('250000000')
    },
    {
        id: 6,
        pool: 'Community and Ecosystem Development',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_COMMUNITY_AND_ECOSYSTEM_DEVELOPMENT_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('300000000')
    },
    {
        id: 7,
        pool: 'Operations Fund',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_OPERATIONS_FUND_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('500000000')
    },
    {
        id: 8,
        pool: 'Liquidity and Exchange Reserves',
        unlockAddress: null,
        lockAmount: 0,
        total: parseEther('250000000')
    },
    {
        id: 9,
        pool: 'Foundation Reserve',
        unlockAddress: process.env.NEXT_PUBLIC_POOL_FOUNDATION_RESERVE_UNLOCK_ADDRESS,
        lockAmount: 0,
        total: parseEther('1000000000')
    }
]

export default function DistributedPanel() {
    useEffect(() => {
        sync().catch(console.error)
    }, [])

    async function sync() {
        const bicRedeemTokenImpl = await client.readContract({...BicRedeemFactoryConfig, functionName: 'bicRedeemImplementation'})
        console.log('bicRedeemTokenImpl: ', bicRedeemTokenImpl)
        for (let i = 0; i < distributedPlan.length; i++) {
            const pool = distributedPlan[i]
            console.log('pool: ', pool)
            if(pool.unlockAddress) {
                const lockAddress = await client.readContract({...BicFactoryConfig, functionName: 'computeProxyAddress', args: [bicRedeemTokenImpl, pad(pool.unlockAddress, { size: 32 }) ]})
                console.log('lockAddress: ', lockAddress)
                pool.lockAddress = lockAddress
                const lockCode = await client.getCode({address: lockAddress})
                if(lockCode === '0x') {
                    console.log('vesting not deployed yet.')
                    pool.notDeployed = true
                }
            }
            // const lockAddress = await BicRedeemFactory.bicRedeemFactory.getLockAddress(pool.id)
        }
    }

    return (
        <table className="table-auto">
            <thead>
            <tr>
                <th>#</th>
                <th>Pool</th>
                <th>Address</th>
                <th>Lock remain</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {distributedPlan.map(e => (
                <tr>
                    <td>{e.id}</td>
                    <td>{e.pool}</td>
                    <td>
                        {e.unlockAddress ?<><a target="_blank" rel="noopener noreferrer" href={"https://sepolia.etherscan.io/address/" + e.lockAddress}>Locked</a>
                        <br/>
                        <a target="_blank" rel="noopener noreferrer" href={"https://sepolia.etherscan.io/address/" + e.unlockAddress}>Unlocked</a></> : 'N/A'}
                    </td>
                    <td>{e.unlockAddress ? e.notDeployed ?
                        e.lockAmount :
                        <button>Create lock pool</button> :
                        'N/A'
                    }</td>
                    <td>{formatEther(e.total)}</td>
                    <td>
                        <button>Detail</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
