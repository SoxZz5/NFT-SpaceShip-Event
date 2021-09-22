// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SpaceShipEventContract is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    struct SpaceShipStat {
        uint256 atk;
        uint256 def;
        uint256 speed;
    }
    struct SpaceShipParts {
        uint256 body;
        uint256 bodySkin;
        uint256 reactor;
        uint256 reactorSkin;
        uint256 weapon;
        uint256 weaponSkin;
    }
    struct SpaceShip {
        uint256 id;
        SpaceShipStat stats;
        SpaceShipParts parts;
        bool isDestroyed;
    }
    Counters.Counter _tokenIds;
    string private _CID;
    uint256 private _tokenCap;
    mapping(uint256 => string) _tokenURIs;
    mapping(uint256 => SpaceShip) _spaceShipDatas;

    constructor(uint256 tokenCap, string memory CID) ERC721("Space Ship Event Contract", "SPE") {
        require(tokenCap > 0, "Space Ship Event: cap is 0");
        bytes memory tempCID = bytes(CID);
        require(tempCID.length > 0, "Space Ship Event: no CID provided");
        _CID = CID;
        _tokenCap = tokenCap;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function getTokenCap() public view virtual returns (uint256) {
        return _tokenCap;
    }

    /*function _createTokenURI(SpaceShipParts memory parts) private returns(string memory) {
        string memory res = "";
        return res;
    }*/

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory) {
        require(_exists(tokenId));
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    /*function mintSpaceShip(address recipient, SpaceShip memory spaceShip) public onlyOwner returns(uint256) {
        uint256 newId = _tokenIds.current();
        //_safeMint(recipient, newId);
        //TODO attribute shit choose by another fucker
        // CONSTRUCT URI
        //_setTokenURI(newId, uri);
        _tokenIds.increment();
        return newId;
    }*/
}
