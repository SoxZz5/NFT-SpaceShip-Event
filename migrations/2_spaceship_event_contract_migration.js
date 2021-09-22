const SpaceShipEventContract = artifacts.require("SpaceShipEventContract");
const CID = "URL_DU_CID";
const tokenCap = 10000;

module.exports = function (deployer) {
  deployer.deploy(SpaceShipEventContract, tokenCap, CID);
};
