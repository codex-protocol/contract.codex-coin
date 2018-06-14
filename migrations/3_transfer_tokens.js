const CodexCoin = artifacts.require('./CodexCoin.sol')

module.exports = (deployer, network, accounts) => {

  deployer
    .then(async () => {

      await CodexCoin.deployed()
        .then(async (codexCoin) => {

          const totalSupply = await codexCoin.totalSupply()

          let transferAddress = null

          switch (network) {
            case 'ganache':
            case 'coverage':
            case 'development':
              transferAddress = accounts[2]
              break

            case 'ropsten':
            case 'rinkeby':
              transferAddress = '0x60f8f4BA00Fc1BdCb482b3F8D8929492C00e81f3'
              break

            default:
              throw new Error('No transferAddress defined for this network')
          }

          console.log(`transferring all ${totalSupply} tokens to:`, transferAddress)

          await codexCoin.transfer(transferAddress, totalSupply)

        })
    })

}
