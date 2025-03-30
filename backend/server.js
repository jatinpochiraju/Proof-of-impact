const express = require("express");
const mintNFT = require("./routes/mintNFT");
const storeProof = require("./routes/storeProof");

const app = express();
app.use(express.json());

app.use("/mint", mintNFT);
app.use("/store-proof", storeProof);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
