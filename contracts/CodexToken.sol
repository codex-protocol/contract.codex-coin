pragma solidity 0.4.24;

import "./MintingERC20.sol";


contract CodexToken is MintingERC20 {

  uint256 public maxSupply = (200 * uint(10) ** 6) * uint(10) ** 18; // 200,000,000

  constructor(uint256 _initialSupply)
    public MintingERC20(_initialSupply, maxSupply, "CodexToken", 18, "CODX")
  {
    creationBlock = block.number;
  }
}
