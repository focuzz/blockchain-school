const AltorosCrowdsale = artifacts.require("./AltorosCrowdsale.sol");
const AltorosToken = artifacts.require("./AltorosToken.sol");
const MultiSigWallet = artifacts.require("./MultiSigWallet.sol");

contract("MultiSigWallet", accounts => {
  it("should cooperatively buy tokens from crowdsale", async () => {
    const crowdsale = await AltorosCrowdsale.deployed();
    const token = await AltorosToken.deployed();
    const wallet = await MultiSigWallet.deployed();

    const accountToFillMultisigFrom = accounts[9];
    const ownerOne = accounts[3];
    const ownerTwo = accounts[4];
    const ownerThree = accounts[5];


    console.log("> getting wallet balance");
    let walletBalance = await web3.eth.getBalance(wallet.address);
    console.log("> checking (assert) wallet balance");
    assert.equal("0", walletBalance);
    console.log("> > > wallet balance:", web3.fromWei(walletBalance, "ether").toString(), "eth");


    console.log("> getting tokens balance");
    let tokensBalance = await token.balanceOf(wallet.address);
    console.log("> checking (assert) tokens balance");
    assert.equal("0", tokensBalance);
    console.log("> > > tokens balance:", tokensBalance.toString(), "alt");


    console.log("> fill multisig wallet with 10 ether");
    await web3.eth.sendTransaction(
      {from:accountToFillMultisigFrom, to:wallet.address, value:web3.toWei("10", "ether")}
    );


    console.log("> getting wallet balance");
    walletBalance = await web3.eth.getBalance(wallet.address);
    console.log("> checking (assert) wallet balance");
    assert.equal("10000000000000000000", walletBalance);
    console.log("> > > wallet balance:", web3.fromWei(walletBalance, "ether").toString(), "eth");


    console.log("> submiting transaction to buy tokens from crowdsale to the wallet using 1 ether")
    await wallet.submitTransaction(
      crowdsale.address,
      web3.toWei(1, "ether"),
      "0x0",
      { from: ownerOne, gas: 3000000, gasPrice: web3.toWei(5, "gwei") }
    );
    console.log("> submitted and first time confirmed");


    console.log("> confirming transaction second time");
    await wallet.confirmTransaction(
        "0x0", // await wallet.submitTransaction.call(...) always returns '0x0'?
        { from: ownerTwo, gas: 300000, gasPrice: web3.toWei(5, "gwei") }
    );
    console.log("> second time confirmed and executed");


    console.log("> getting wallet balance after transaction executed");
    walletBalance = await web3.eth.getBalance(wallet.address);
    console.log("> checking (assert) wallet balance");
    assert.equal("9000000000000000000", walletBalance);
    console.log("> > > wallet balance:", web3.fromWei(walletBalance, "ether").toString(), "eth");


    console.log("> getting tokens balance after transaction executed");
    tokensBalance = await token.balanceOf(wallet.address);
    console.log("> checking (assert) tokens balance");
    assert.equal("1e+21", tokensBalance);
    console.log("> > > tokens balance:", tokensBalance.toString(), "alt");
  });
});
