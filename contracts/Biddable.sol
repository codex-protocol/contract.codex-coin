pragma solidity 0.4.21;

import "./MintingERC20.sol";


contract Biddable is MintingERC20 {

  uint256 public maxSupply = (200 * uint(10) ** 6) * uint(10) ** 18; // 200,000,000

  function Biddable(uint256 _initialSupply)
    public MintingERC20(_initialSupply, maxSupply, "BidDex", 18, "BDX")
  {
    creationBlock = block.number;
  }
}
