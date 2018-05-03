var AltorosCrowdsale = artifacts.require("./AltorosCrowdsale.sol");
var AltorosToken = artifacts.require("./AltorosToken.sol");

contract("Crowdsale", (accounts) => {
    it ("should buy tokens", async () => {
        const Crowdsale = await AltorosCrowdsale.deployed();
        const Token = await AltorosToken.deployed();

        await Crowdsale.buyTokens(accounts[1], { value: web3.toWei(1, "ether") });
        const balance = await Token.balanceOf(accounts[1]);

        assert.equal(balance.toString(), "1e+21");
    });
})