pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract AltorosToken is MintableToken {
  string public name = "Altoros Token";
  string public symbol = "ALT";
  uint public decimals = 18;
}
