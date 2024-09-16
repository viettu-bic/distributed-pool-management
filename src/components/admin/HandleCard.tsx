"use client";

import { useAccount, useWalletClient } from "wagmi";
import { createPublicClient, getContract, http } from "viem";
import { HandleControllerConfig } from "@/contract/contractConfig";
import { useCallback, useEffect, useState } from "react";

type HandleControllerConfig = {
  marketplace: string;
  verifier: string;
  forwarder: string;
  owner: string;
  collector: string;
  auctionConfig: {
    buyoutBidAmount: string;
    timeBufferInSeconds: string;
    bidBufferBps: string;
  };
};
export default function HandleCard() {
  const { data: walletClient } = useWalletClient();
  const [config, setConfig] = useState<HandleControllerConfig>();
  const [owner, setOwner] = useState<string>();
  const [forwarder, setForwarder] = useState<string>();
  const [verifier, setVerifier] = useState<string>();
  const [marketplace, setMarketplace] = useState<string>();
  const [collector, setCollector] = useState<string>();

  const handleControllerContract = useCallback(() => {
    if (!walletClient) return;
    const publicClient = createPublicClient({
      transport: http(),
      chain: walletClient.chain,
    });

    const contract = getContract({
      ...HandleControllerConfig,
      client: {
        wallet: walletClient,
        public: publicClient,
      },
    });
    return contract;
  }, [walletClient]);

  const fetchConfig = async () => {
    if (!walletClient) return;
    const contract = handleControllerContract();
    if (!contract) return;

    const [marketplace, verifier, owner, forwarder, collector, auctionConfig] =
      await Promise.all([
        contract.read.marketplace(),
        contract.read.verifier(),
        contract.read.owner(),
        contract.read.forwarder(),
        contract.read.collector(),
        contract.read.auctionConfig(),
      ]);

    setOwner(owner as string);
    setForwarder(forwarder as string);
    setVerifier(verifier as string);
    setMarketplace(marketplace as string);
    setCollector(collector as string);
  };

  const onUpdateOwner = async () => {
    try {
      const contract = handleControllerContract();
      if (!contract) {
        // Handle notification
        return;
      }
      if (!owner) {
        // Handle notification
        return;
      }
      const tx = await contract.write.transferOwnership([owner]);

      // Handle success
      console.log("🚀 ~ onUpdateOwner ~ tx:", tx);
      fetchConfig();
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateOwner ~ error:", error);
    }
  };

  const onUpdateCollector = async () => {
    try {
      const contract = handleControllerContract();
      if (!contract) {
        // Handle notification
        return;
      }
      if (!owner) {
        // Handle notification
        return;
      }
      const tx = await contract.write.setCollector([collector]);

      // Handle success
      console.log("🚀 ~ onUpdateCollector ~ tx:", tx);
      fetchConfig();
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateCollector ~ error:", error);
    }
  };

  const onUpdateMarketplace = async () => {
    try {
      const contract = handleControllerContract();
      if (!contract) {
        // Handle notification
        return;
      }
      if (!owner) {
        // Handle notification
        return;
      }
      const tx = await contract.write.setMarketplace([marketplace]);

      // Handle success
      console.log("🚀 ~ onUpdateMarketplace ~ tx:", tx);
      fetchConfig();
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateMarketplace ~ error:", error);
    }
  };

  const onUpdateForwarder = async () => {
    try {
      const contract = handleControllerContract();
      if (!contract) {
        // Handle notification
        return;
      }
      if (!owner) {
        // Handle notification
        return;
      }
      const tx = await contract.write.setForwarder([forwarder]);

      // Handle success
      console.log("🚀 ~ onUpdateForwarder ~ tx:", tx);
      fetchConfig();
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateForwarder ~ error:", error);
    }
  };

  const onUpdateVerifier = async () => {
    try {
      const contract = handleControllerContract();
      if (!contract) {
        // Handle notification
        return;
      }
      if (!owner) {
        // Handle notification
        return;
      }
      const tx = await contract.write.setVerifier([verifier]);

      // Handle success
      console.log("🚀 ~ onUpdateVerifier ~ tx:", tx);
      fetchConfig();
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateVerifier ~ error:", error);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, [walletClient]);
  return (
    <div className="card-admin">
      <a href="#">
        <h5 className="card-title">Handle Controller</h5>
      </a>
      <div className="mb-5">
        <label className="form-label">Owner</label>
        <input
          type="email"
          className="form-input"
          value={owner}
          onChange={(e) => {
            setOwner(e.target.value);
          }}
        />
        <button className="btn-danger" onClick={onUpdateOwner}>
          Update owner
        </button>
      </div>
      <div className="mb-5">
        <label className="form-label">Verifier</label>
        <input
          type="email"
          className="form-input"
          value={verifier}
          onChange={(e) => {
            setVerifier(e.target.value);
          }}
        />
        <button className="btn-danger" onClick={onUpdateVerifier}>
          Update verifier
        </button>
      </div>
      <div className="mb-5">
        <label className="form-label">Forwarder</label>
        <input
          type="email"
          className="form-input"
          value={forwarder}
          onChange={(e) => {
            setForwarder(e.target.value);
          }}
        />
        <button className="btn-danger" onClick={onUpdateForwarder}>
          Update forwarder
        </button>
      </div>
      <div className="mb-5">
        <label className="form-label">Marketplace</label>
        <input
          type="email"
          className="form-input"
          value={marketplace}
          onChange={(e) => {
            setMarketplace(e.target.value);
          }}
        />
        <button className="btn-danger" onClick={onUpdateMarketplace}>
          Update marketplace
        </button>
      </div>
      <div className="mb-5">
        <label className="form-label">Collector</label>
        <input
          type="email"
          className="form-input"
          value={collector}
          onChange={(e) => {
            setCollector(e.target.value);
          }}
        />
        <button className="btn-danger" onClick={onUpdateCollector}>
          Update collector
        </button>
      </div>
      <div className="mb-5">
        <label className="form-label">Marketplace auction config</label>
        <div className="grid grid-cols-5 grid-rows-5 gap-4">
          <div className="col-span-5 row-span-3">
            <label className="form-label">BuyoutBidAmount</label>
            <input type="email" className="form-input" />
          </div>
          <div className="col-span-5 row-span-3">
            <label className="form-label">BuyoutBidAmount</label>
            <input type="email" className="form-input" />
          </div>
          <div className="col-span-5 row-span-3">
            <label className="form-label">BuyoutBidAmount</label>
            <input type="email" className="form-input" />
          </div>
        </div>
        <button className="btn-danger" onClick={onUpdateCollector}>
          Update auction config
        </button>
      </div>
    </div>
  );
}
