var AltorosCrowdsale = artifacts.require("./AltorosCrowdsale.sol");
var AltorosToken = artifacts.require("./AltorosToken.sol");

module.exports = function(deployer, network, accounts) {
  const openedTime = web3.eth.getBlock("latest").timestamp;
  const closedTime = openedTime + 60 * 60 * 24 * 31;
  const rate = new web3.BigNumber("1000");
  const wallet = accounts[0];

  deployer.deploy(
    AltorosCrowdsale,
    openedTime,
    closedTime,
    rate,
    wallet,
    AltorosToken.address
  );
};
