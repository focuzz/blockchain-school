var MultiSigWallet = artifacts.require("./MultiSigWallet.sol");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(
        MultiSigWallet,
        [accounts[3], accounts[4], accounts[5]],
        2
    );
}