// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SpaceShipEventContract is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter _tokenIds;
    mapping(uint256 => string) _tokenURIs;

    struct SpaceShipStat {
        uint256 atk;
        uint256 def;
        uint256 speed;
    }

    struct SpaceShipRender {
        uint256 body;
        uint256 bodySkin;
        uint256 reactor;
        uint256 reactorSkin;
        uint256 weapon;
        uint256 weaponSkin;
    }

    struct SpaceShip {
        uint256 id;
        string uri;
        SpaceShipStat stats;
        SpaceShipRender render;
    }

    constructor() ERC721("Space Ship Event Contract", "SPE") {}

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory) {
        require(_exists(tokenId));
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function getAllSpaceShips() public view returns(RenderSpaceShip[] memory)  {
        uint256 curId = _tokenIds.current();
        uint256 counter = 0;
        RenderSpaceShip[] memory res = new RenderSpaceShip[](curId);
        for(uint256 i = 0; i < curId; i++) {
            if(_exists(counter)) {
                string memory uri = tokenURI(counter);
                res[counter] = RenderSpaceShip(counter, uri);
            }
            counter++;
        }
        return res;
    }

    function mint(address recipient, string memory uri) public onlyOwner() returns(uint256) {
        uint256 newId = _tokenIds.current();
        _mint(recipient, newId);
        //TODO attribute shit choose by another fucker
        _setTokenURI(newId, uri);
        _tokenIds.increment();
        return newId;
    }
}
