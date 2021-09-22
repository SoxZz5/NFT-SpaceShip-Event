// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SpaceShipEventContract is ERC721URIStorage, Ownable {
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
    mapping(uint256 => SpaceShip) _spaceShipDatas;

    constructor(uint256 tokenCap, string memory CID) ERC721("Space Ship Event Contract", "SPE") {
        require(tokenCap > 0, "Space Ship Event: cap is 0");
        bytes memory tempCID = bytes(CID);
        require(tempCID.length > 0, "Space Ship Event: no CID provided");
        _CID = CID;
        _tokenCap = tokenCap;
    }

    function getCID() public view virtual returns (string memory) {
        return _CID;
    }

    function getTokenCap() public view virtual returns (uint256) {
        return _tokenCap;
    }

    function partsToStr(SpaceShipParts memory parts) internal pure returns (string memory) {
      return string(abi.encodePacked(parts.body, "-", parts.bodySkin, "_",parts.reactor, "-", parts.reactorSkin, "_",parts.weapon, "-", parts.weaponSkin, "_"));
    }

    function _createTokenURI(SpaceShipParts memory parts) internal view returns(string memory) {
        return string(abi.encodePacked(_CID, partsToStr(parts)));
    }

    function _setSpaceShipForToken(uint256 tokenId, SpaceShip memory spaceShip) internal {
        _spaceShipDatas[tokenId] = spaceShip;
    }

    function _destroySpaceShip(uint256 tokenId) internal {
        _spaceShipDatas[tokenId].isDestroyed = true;
        //TODO: change ifps for destroyed ship , sorry boys !
    }

    function _mint(address recipient, SpaceShip memory spaceShip) public onlyOwner returns(uint256) {
        uint256 newId = _tokenIds.current();
        spaceShip.isDestroyed = false;
        string memory uri = _createTokenURI(spaceShip.parts);
        _setTokenURI(newId, uri);
        _setSpaceShipForToken(newId, spaceShip);
        _mint(recipient, newId);
        _tokenIds.increment();
        return newId;
    }
}
