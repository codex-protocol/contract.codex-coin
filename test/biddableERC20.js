import Utils from './utils';

const BiddableERC20 = artifacts.require('../contracts/BiddableERC20.sol');

contract('BiddableERC20', function (accounts) {
  // special case which cannot be reached from Biddable
  it('deploy & check for total', function () {
    var instance;

    return BiddableERC20.new(
      100000, 'Bid', 18, 'b', true, false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 100000));
  });
});
