const SpaceShipEventContract = artifacts.require("SpaceShipEventContract");

module.exports = function (deployer) {
  deployer.deploy(SpaceShipEventContract);
};
