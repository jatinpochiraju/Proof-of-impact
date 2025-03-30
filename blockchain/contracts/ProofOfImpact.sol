// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfImpact is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => bool) public isSoulbound;

    event ImpactNFTMinted(address indexed recipient, uint256 indexed tokenId, string uri);

    constructor() ERC721("ProofOfImpact", "POI") {}

    function mintImpactNFT(address recipient, string memory metadataURI) public onlyOwner {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        isSoulbound[newTokenId] = true;
        emit ImpactNFTMinted(recipient, newTokenId, metadataURI);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override {
        require(from == address(0) || !isSoulbound[tokenId], "Soulbound NFTs cannot be transferred");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
