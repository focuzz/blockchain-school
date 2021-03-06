pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "./../node_modules/zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";

contract AltorosCrowdsale is MintedCrowdsale, TimedCrowdsale, Ownable {

    function AltorosCrowdsale
    (
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _rate,
        address _wallet,
        MintableToken _token
    )
    Crowdsale(_rate, _wallet, _token)
    TimedCrowdsale(_openingTime, _closingTime)
    public
    {

    }
}
