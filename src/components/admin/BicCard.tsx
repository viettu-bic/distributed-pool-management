"use client";

import { BicTokenPaymasterConfig, client } from "@/contract/contractConfig";
import { useCallback, useEffect, useState } from "react";
import { createPublicClient, getContract, http } from "viem";
import { useWalletClient } from "wagmi";

export default function BicCard() {
  const { data: walletClient } = useWalletClient();
  const [owner, setOwner] = useState<string>();
  const [oracle, setOracle] = useState<string>();
  const [paused, setPaused] = useState<boolean>();

  const bicContract = useCallback(() => {
    if (!walletClient) return;
    const publicClient = createPublicClient({
      transport: http(),
      chain: walletClient.chain,
    });
    const contract = getContract({
      ...BicTokenPaymasterConfig,
      client: {
        wallet: walletClient,
        public: publicClient,
      },
    });
    return contract;
  }, [walletClient]);

  const fetchConfig = async () => {
    if (!walletClient) return;
    const contract = bicContract();
    if (!contract) return;

    const [oracle, owner, paused] = await Promise.all([
      contract.read.oracle(),
      contract.read.owner(),
      contract.read.paused(),
    ]);

    setPaused(paused as boolean);
    setOracle(oracle as string);
    setOwner(owner as string);
  };

  useEffect(() => {
    fetchConfig();
  }, [walletClient]);

  const handleError = (error: any) => {
    alert(error?.message || "Unknown error");
  };

  const onUpdateOracle = async () => {
    try {
      const contract = bicContract();
      if (!contract) {
        // Handle notification
        return;
      }
      if (!oracle) {
        // Handle notification
        return;
      }
      const tx = await contract.write.setOracle([oracle]);

      // Handle success
      console.log("🚀 ~ onUpdateOracle ~ tx:", tx);
      fetchConfig();
      alert("Oracle updated successfully");
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateOracle ~ error:", error);
      handleError(error);
    }
  };

  const onUpdateOwner = async () => {
    try {
      const contract = bicContract();
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
      console.log("🚀 ~ onUpdateOracle ~ tx:", tx);
      fetchConfig();
      alert("Oracle updated successfully");
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateOracle ~ error:", error);
      handleError(error);

    }
  };

  const onPauseContract = async () => {
    try {
      const contract = bicContract();
      if (!contract) {
        // Handle notification
        return;
      }
      if (!paused) {
        const tx = await contract.write.pause();
        console.log("🚀 ~ onUpdateOracle ~ tx:", tx);
      }
      if (paused) {
        const tx = await contract.write.unpause();
        console.log("🚀 ~ onPauseContract ~ tx:", tx);
      }

      // Handle success
      fetchConfig();
      alert("Update status paused successfully");
    } catch (error) {
      // Handle error
      console.log("🚀 ~ onUpdateOracle ~ error:", error);
      handleError(error);

    }
  };

  return (
    <div className="card-admin">
      <a href="#">
        <h5 className="card-title">BIC & Paymaster</h5>
      </a>
      <div className="mb-5">
        <label className="form-label">Oracle</label>
        <input
          type="email"
          className="form-input"
          value={oracle}
          onChange={(e) => setOracle(e.target.value)}
        />
        <button className="btn-danger" onClick={onUpdateOracle}>
          Update oracle
        </button>
      </div>
      <div className="mb-5">
        <label className="form-label">Owner</label>
        <input
          type="email"
          className="form-input"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <button className="btn-danger" onClick={onUpdateOwner}>
          Update owner
        </button>
      </div>
      <div className="mb-5">
        <label className="form-label">Pause/Unpause</label>
        <p className="form-explain">
          Current: {paused ? "Paused" : "Unpaused"}
        </p>
      </div>
      <button className="btn-danger" onClick={onPauseContract}>
        {!paused ? "Paused" : "Unpaused"}
      </button>
    </div>
  );
}
