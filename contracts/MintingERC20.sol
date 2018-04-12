pragma solidity 0.4.21;

import "./BiddableERC20.sol";

contract MintingERC20 is BiddableERC20 {

    //Variables
    mapping(address => bool) public minters;

    uint256 public maxSupply;
    bool public disableMinting;

    //    Modifiers
    modifier onlyMinters () {
        require(true == minters[msg.sender]);
        _;
    }

    function MintingERC20(
        uint256 _initialSupply,
        uint256 _maxSupply,
        string _tokenName,
        uint8 _decimals,
        string _symbol,
        bool _transferAllSupplyToOwner,
        bool _locked
    )
    public BiddableERC20(_initialSupply, _tokenName, _decimals, _symbol, _transferAllSupplyToOwner, _locked) {
        standard = "MintingERC20 0.1";
        minters[msg.sender] = true;
        maxSupply = _maxSupply;
    }

    function addMinter(address _newMinter) public onlyOwner {
        minters[_newMinter] = true;
    }

    function removeMinter(address _minter) public onlyOwner {
        minters[_minter] = false;
    }

    function mint(address _addr, uint256 _amount) public onlyMinters returns (uint256) {
        if (true == disableMinting) {
            return uint256(0);
        }

        if (_amount == uint256(0)) {
            return uint256(0);
        }

        if (totalSupply.add(_amount) > maxSupply) {
            return uint256(0);
        }

        totalSupply = totalSupply.add(_amount);
        balances[_addr] = balances[_addr].add(_amount);
        Transfer(address(0), _addr, _amount);

        return _amount;
    }
}

