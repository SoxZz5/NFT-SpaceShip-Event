const SpaceShipEventContract = artifacts.require("SpaceShipEventContract");

module.exports = function (deployer) {
  require("dotenv").config();
  deployer.deploy(SpaceShipEventContract, process.env.SPE_CID);
};
