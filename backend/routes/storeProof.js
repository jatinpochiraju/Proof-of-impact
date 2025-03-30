const express = require("express");
const ipfsClient = require("ipfs-http-client");

const router = express.Router();
const ipfs = ipfsClient.create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

router.post("/", async (req, res) => {
    try {
        const { data } = req.body;
        const added = await ipfs.add(data);
        res.json({ ipfsHash: added.path });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
