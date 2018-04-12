const Biddable = artifacts.require('./Biddable.sol');

module.exports = function (deployer, network, accounts) {
  if (network === 'ganache') {
    deployer.deploy(Biddable, 0, false);
  }
};
