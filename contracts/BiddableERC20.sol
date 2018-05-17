pragma solidity 0.4.23;

import "./ERC20/StandardToken.sol";
import "./zeppelin-solidity/Pausable.sol";
import "./zeppelin-solidity/CanReclaimToken.sol";


contract BiddableERC20 is StandardToken, CanReclaimToken, Pausable {
  /* Public variables of the token */
  uint256 public creationBlock;

  uint8 public decimals;

  string public name;

  string public symbol;

  /* Initializes contract with initial supply tokens to the creator of the contract */
  constructor(
    uint256 _totalSupply,
    string _tokenName,
    uint8 _decimalUnits,
    string _tokenSymbol
  ) public
  {
    totalSupply_ = _totalSupply;

    balances[msg.sender] = _totalSupply;

    // Set the name for display purposes
    name = _tokenName;

    // Set the symbol for display purposes
    symbol = _tokenSymbol;

    // Amount of decimals for display purposes
    decimals = _decimalUnits;

    creationBlock = block.number;
  }

  function transfer(address _to, uint256 _value) public whenNotPaused returns (bool) {
    return super.transfer(_to, _value);
  }

  function transferFrom(address _from, address _to, uint256 _value) public whenNotPaused returns (bool) {
    return super.transferFrom(_from, _to, _value);
  }

  function approve(address _spender, uint256 _value) public whenNotPaused returns (bool) {
    return super.approve(_spender, _value);
  }

  function increaseApproval(address _spender, uint _addedValue) public whenNotPaused returns (bool success) {
    return super.increaseApproval(_spender, _addedValue);
  }

  function decreaseApproval(address _spender, uint _subtractedValue) public whenNotPaused returns (bool success) {
    return super.decreaseApproval(_spender, _subtractedValue);
  }
}
