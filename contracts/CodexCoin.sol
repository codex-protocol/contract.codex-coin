pragma solidity 0.4.24;

import "./ERC20/PausableToken.sol";


contract CodexCoin is PausableToken {

  /* solium-disable uppercase */
  uint8 constant public decimals = 18;

  string constant public name = "CodexCoin";

  string constant public symbol = "CODX";
  /* solium-enable */

  constructor(uint256 _totalSupply) public {
    totalSupply_ = _totalSupply;
    balances[msg.sender] = totalSupply_;
  }

  /**
   * @dev Reclaim all ERC20Basic compatible tokens
   * @param token ERC20Basic The address of the token contract
   */
  function reclaimToken(ERC20Basic token) external onlyOwner {
    uint256 balance = token.balanceOf(this);
    token.transfer(owner, balance);
  }
}
