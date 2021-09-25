require("dotenv").config();
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

    it("has correct cid", async () => {
      const CID = await spaceShipEventcontract.getCID();
      assert.equal(CID, process.env.SPE_CID);
    });
  });

  describe("SpaceShipEventContract minting", async () => {
    it("minted successfully", async () => {
      const shipStats = ["2000", "500", "1250"];
      const shipParts = ["1", "10", "2", "5", "11", "8"];
      const ship = ["0", shipStats, shipParts, false];
      await spaceShipEventcontract.mintSpaceShip(accounts[0], ship);
      const tokenShip = await spaceShipEventcontract.getShip(0);
      const balanceOfOwner = await spaceShipEventcontract.balanceOf(
        accounts[0]
      );
      assert.deepEqual(tokenShip, ship);
      assert.equal(balanceOfOwner, 1);
    });
  });
});
