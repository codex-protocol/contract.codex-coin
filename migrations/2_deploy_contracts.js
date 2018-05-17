const Biddable = artifacts.require('./Biddable.sol')

module.exports = (deployer, network, accounts) => {
  if (network === 'ganache') {
    deployer.deploy(Biddable, 0)
  }
}
