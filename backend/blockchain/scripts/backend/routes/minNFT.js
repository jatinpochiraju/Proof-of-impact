const express = require("express");
const { ethers } = require("ethers");
const contractABI = require("../utils/contractABI.json");

const router = express.Router();

const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/YOUR_INFURA_KEY");
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

router.post("/", async (req, res) => {
    try {
        const { recipient, metadataURI } = req.body;
        const tx = await contract.mintImpactNFT(recipient, metadataURI);
        await tx.wait();
        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
