const { BigNumber } = web3

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const CodexCoin = artifacts.require('CodexCoin')

contract('CodexCoin', (accounts) => {
  let codexCoin = null

  const name = 'CodexCoin'
  const symbol = 'CODX'
  const decimals = 18

  beforeEach(async function () {
    codexCoin = await CodexCoin.new(100)
  })

  it('has a name', async function () {
    const tokenName = await codexCoin.name()
    tokenName.should.be.equal(name)
  })

  it('has a symbol', async function () {
    const tokenSymbol = await codexCoin.symbol()
    tokenSymbol.should.be.equal(symbol)
  })

  it('has an amount of decimals', async function () {
    const tokenDecimals = await codexCoin.decimals()
    tokenDecimals.should.be.bignumber.equal(decimals)
  })
})
