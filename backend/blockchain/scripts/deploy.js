const hre = require("hardhat");

async function main() {
    const ProofOfImpact = await hre.ethers.getContractFactory("ProofOfImpact");
    const poi = await ProofOfImpact.deploy();
    await poi.deployed();

    console.log("ProofOfImpact deployed to:", poi.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
