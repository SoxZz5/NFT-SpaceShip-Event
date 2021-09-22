const { assert } = require("chai");

const SpaceShipEventContract = artifacts.require(
  "./SpaceShipEventContract.sol"
);

require("chai").use(require("chai-as-promised")).should();

contract("SpaceShipEventContract", (accounts) => {
  let spaceShipEventcontract;

  before(async () => {
    spaceShipEventcontract = await SpaceShipEventContract.deployed();
  });

  describe("SpaceShipEventContract deployment", async () => {
    it("deploys successfully", async () => {
      const address = await spaceShipEventcontract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
    });

    it("has correct name", async () => {
      const name = await spaceShipEventcontract.name();
      assert.equal(name, "Space Ship Event Contract");
    });

    it("has correct cap", async () => {
      const cap = await spaceShipEventcontract.getTokenCap();
      assert.equal(cap, 10000);
    });

    it("has correct cid", async () => {
      const CID = await spaceShipEventcontract.getCID();
      assert.equal(CID, "URL_DU_CID");
    });
  });

  describe("SpaceShipEventContract minting", async () => {
    it("minted successfully", async () => {
      /*const uri = "https://example.com";
      await spaceShipEventcontract.mint(accounts[0], uri);
      const tokenUri = await spaceShipEventcontract.tokenURI(0);
      const balanceOfOwner = await spaceShipEventcontract.balanceOf(
        accounts[0]
      );
      assert.equal(uri, tokenUri);
      assert.equal(balanceOfOwner, 1);*/
    });
  });
});
