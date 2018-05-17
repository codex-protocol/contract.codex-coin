import utils from './utils'

const CodexTokenERC20 = artifacts.require('../contracts/CodexTokenERC20.sol')

contract('CodexTokenERC20', (accounts) => {

  // special case which cannot be reached from CodexToken
  it('deploy & check for total', () => {

    let instance

    return CodexTokenERC20.new(100000, 'CodexToken', 18, 'CODX')
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 100000)
      })
  })
})
