'use client'

import {useAccount, useConnect, useDisconnect} from 'wagmi'
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import DistributedPanel from "@/components/DistributedPanel";

function App() {
    const account = useAccount()
    const {connectors, connect, status, error} = useConnect()
    const {disconnect} = useDisconnect()

    return (
        <>
            <TopBar/>
            {/*<br/>*/}
            {/*<br/>*/}
            <SideBar/>
            <div className="p-4 sm:ml-64">

                <div className="p-4">
                    <DistributedPanel/>
                </div>

                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <h2>Account</h2>
                    <div>
                        status: {account.status}
                        <br/>
                        addresses: {JSON.stringify(account.addresses)}
                        <br/>
                        chainId: {account.chainId}
                    </div>

                    {account.status === 'connected' && (
                        <button type="button" onClick={() => disconnect()}>
                            Disconnect
                        </button>
                    )}
                </div>

                <div>
                    <h2>Connect</h2>
                    {connectors.map((connector) => (
                        <button
                            key={connector.uid}
                            onClick={() => connect({connector})}
                            type="button"
                        >
                            {connector.name}
                        </button>
                    ))}
                    <div>{status}</div>
                    <div>{error?.message}</div>
                </div>
            </div>
        </>
    )
}

export default App
