const SpaceShipEventContract = artifacts.require("SpaceShipEventContract");
const CID = "URL_DU_CID";

module.exports = function (deployer) {
  deployer.deploy(SpaceShipEventContract, CID);
};
