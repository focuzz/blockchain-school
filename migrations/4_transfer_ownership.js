var AltorosCrowdsale = artifacts.require("./AltorosCrowdsale.sol");
var AltorosToken = artifacts.require("./AltorosToken.sol");

module.exports = (deployer) => deployer
    .then(async () => {
        const Token = await AltorosToken.deployed();
        await Token.transferOwnership(AltorosCrowdsale.address);
    });
