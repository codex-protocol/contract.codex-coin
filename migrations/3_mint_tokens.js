const Biddable = artifacts.require('./Biddable.sol')

module.exports = function(deployer, network, accounts) {
    Biddable.deployed().then(instance => {
        instance.totalSupply().then(supply => {
            console.log(supply)
        })
    })
}
