const Biddable = artifacts.require('./Biddable.sol')

module.exports = function(deployer, network, accounts) {
    deployer.deploy(Biddable, 100, false)
}
