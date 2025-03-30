import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI.json";

export default function MintNFT() {
    const [recipient, setRecipient] = useState("");
    const [metadataURI, setMetadataURI] = useState("");
    const [status, setStatus] = useState("");

    async function mintNFT() {
        if (!recipient || !metadataURI) {
            setStatus("Please enter recipient and metadata URI");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();

            const contractAddress = "YOUR_CONTRACT_ADDRESS";
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const tx = await contract.mintImpactNFT(recipient, metadataURI);
            await tx.wait();

            setStatus(`Minted! TX: ${tx.hash}`);
        } catch (error) {
            setStatus(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl">Mint Proof of Impact NFT</h1>
            <input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="border p-2 m-2"/>
            <input type="text" placeholder="Metadata URI" value={metadataURI} onChange={(e) => setMetadataURI(e.target.value)} className="border p-2 m-2"/>
            <button onClick={mintNFT} className="bg-blue-500 text-white px-4 py-2 rounded">Mint NFT</button>
            <p>{status}</p>
        </div>
    );
}
