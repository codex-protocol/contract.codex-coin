import utils from './utils'

const BiddableERC20 = artifacts.require('../contracts/BiddableERC20.sol')

contract('BiddableERC20', (accounts) => {

  // special case which cannot be reached from Biddable
  it('deploy & check for total', () => {

    let instance

    return BiddableERC20.new(100000, 'Bid', 18, 'b')
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 100000)
      })
  })
})
