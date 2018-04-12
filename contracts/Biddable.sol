pragma solidity 0.4.21;

import "./MintingERC20.sol";

contract Biddable is MintingERC20 {

    bool public transferFrozen;

    uint256 public maxSupply = (200 * uint(10) ** 6) * uint(10) ** 18; // 200,000,000

    function Biddable(
        uint256 _initialSupply,
        bool _locked
    )
    public MintingERC20(_initialSupply, maxSupply, "BidDex", 18, "BDX", false, _locked) {
       standard = "Biddable 0.1";
    }

    // Lock contract
    function setLocked(bool _locked) public onlyOwner {
       locked = _locked;
    }

    // Allow token transfer.
    function freezing(bool _transferFrozen) public onlyOwner {
        transferFrozen = _transferFrozen;
    }

    // ERC20 functions
    // =========================
    function transfer(address _to, uint _value) public returns (bool) {
       require(!transferFrozen);
       return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
       require(!transferFrozen);
       return super.transferFrom(_from, _to, _value);
    }
}
