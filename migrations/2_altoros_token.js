var AltorosToken = artifacts.require("./AltorosToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AltorosToken);
};
