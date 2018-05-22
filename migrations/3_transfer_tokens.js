const CodexToken = artifacts.require('./CodexToken.sol')

module.exports = (deployer, network, accounts) => {

  deployer
    .then(async () => {

      await CodexToken.deployed()
        .then(async (codexToken) => {

          const totalSupply = await codexToken.totalSupply()

          let transferAddress = null

          switch (network) {
            case 'ganache':
            case 'coverage':
            case 'development':
              transferAddress = accounts[2]
              break

            case 'rinkeby':
              transferAddress = '0x60f8f4BA00Fc1BdCb482b3F8D8929492C00e81f3'
              break

            default:
              throw new Error('No transferAddress defined for this network')
          }

          console.log(`transferring all ${totalSupply} tokens to:`, transferAddress)

          await codexToken.transfer(transferAddress, totalSupply)

        })
    })

}
