// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

library SpaceShips {
    struct ShipStat {
        uint256 atk;
        uint256 def;
        uint256 speed;
    }
    struct ShipParts {
        uint256 body;
        uint256 bodySkin;
        uint256 reactor;
        uint256 reactorSkin;
        uint256 weapon;
        uint256 weaponSkin;
    }
    struct Ship {
        uint256 id;
        ShipStat stats;
        ShipParts parts;
        bool isDestroyed;
    }
}

contract SpaceShipEventContract is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter _tokenIds;
    string private _CID;
    mapping(uint256 => SpaceShips.Ship) private _AliveSpaceShipDatas;
    mapping(uint256 => SpaceShips.Ship) private _spaceShipDatas;

    constructor(string memory CID) ERC721("Space Ship Event Contract", "SPE") {
        bytes memory tempCID = bytes(CID);
        require(tempCID.length > 0, "Space Ship Event: no CID provided");
        _CID = CID;
    }

    function totalShips() public view returns(uint256) {
        return _tokenIds.current();
    }

    function getCID() public view virtual returns (string memory) {
        return _CID;
    }

    function getShip(uint256 tokenId) public view returns (SpaceShips.Ship memory) {
        return _spaceShipDatas[tokenId];
    }

    function _partsToStr(SpaceShips.ShipParts memory parts) internal view returns (string memory) {
      return string(abi.encodePacked(parts.body, "-", parts.bodySkin, "_",parts.reactor, "-", parts.reactorSkin, "_",parts.weapon, "-", parts.weaponSkin, "_"));
    }

    function _createTokenURI(SpaceShips.ShipParts memory parts) internal view returns(string memory) {
        return string(abi.encodePacked(_CID, '/', _partsToStr(parts)));
    }

    function _createSpaceShipForToken(uint256 tokenId, SpaceShips.Ship memory spaceShip) internal {
         spaceShip.isDestroyed = false;
         spaceShip.id = tokenId;
        _spaceShipDatas[tokenId] = spaceShip;
    }

    function _destroySpaceShip(uint256 tokenId) internal {
        _spaceShipDatas[tokenId].isDestroyed = true;
        //TODO: change ifps for destroyed ship , sorry boys !
    }

    function mintSpaceShip(address recipient, SpaceShips.Ship memory spaceShip) public returns(uint256) {
        uint256 newId = _tokenIds.current();
        _mint(recipient, newId);
        string memory uri = _createTokenURI(spaceShip.parts);
        _setTokenURI(newId, uri);
        _createSpaceShipForToken(newId, spaceShip);
        _tokenIds.increment();
        return newId;
    }
}
