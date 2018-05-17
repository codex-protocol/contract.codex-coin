import utils from './utils'

const CodexToken = artifacts.require('../contracts/CodexToken.sol')

contract('CodexToken', (accounts) => {

  it('deploy & check for total', () => {

    let instance

    return CodexToken.new(1000000)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return utils.totalShouldEqualTo(instance, 1000000)
      })
  })

  it('deploy & pause contract', () => {

    let instance

    return CodexToken.new(1000000)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.pause()
      })
      .then(() => {
        return utils.pausedShouldEqualTo(instance, true)
      })
  })

  it('deploy & mint', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
  })

  it('deploy & mint & transfer', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return instance.transfer(accounts[1], 10)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[1], 10)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 990)
      })
  })

  it('deploy & mint & approve & transfer from account', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return instance.approve(accounts[0], 2)
      })
      .then(() => {
        return instance.transferFrom(accounts[0], accounts[2], 2)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 998)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[2], 2)
      })
  })

  it('deploy & mint & approve & decrease approve', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[1], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[1], 1000)
      })
      .then(() => {
        return instance.approve(accounts[1], 20)
      })
      .then(() => {
        return instance.decreaseApproval(accounts[1], 10)
      })
      .then(() => {
        return instance.allowance(accounts[0], accounts[1])
      })
      .then(() => {
        return utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 10)
      })
  })

  it('deploy & mint & approve & try to decrease on value bigger then exists', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[1], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[1], 1000)
      })
      .then(() => {
        return instance.approve(accounts[1], 20)
      })
      .then(() => {
        return instance.decreaseApproval(accounts[1], 30)
      })
      .then(() => {
        return instance.allowance(accounts[0], accounts[1])
      })
      .then(() => {
        return utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0)
      })
  })

  it('deploy & mint & approve & increase approve', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[1], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[1], 1000)
      })
      .then(() => {
        return instance.approve(accounts[1], 20)
      })
      .then(() => {
        return instance.increaseApproval(accounts[1], 10)
      })
      .then(() => {
        return instance.allowance(accounts[0], accounts[1])
      })
      .then(() => {
        return utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 30)
      })
  })

  it('deploy & add minter', () => {

    let instance

    return CodexToken.new(1000000)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return utils.totalShouldEqualTo(instance, 1000000)
      })
      .then(() => {
        return instance.addMinter(accounts[0])
      })
      .then(() => {
        return utils.addressShouldBeMinter(instance, accounts[0], true)
      })
  })

  it('deploy & remove minter', () => {

    let instance

    return CodexToken.new(1000000)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return utils.totalShouldEqualTo(instance, 1000000)
      })
      .then(() => {
        return instance.addMinter(accounts[0])
      })
      .then(() => {
        return instance.removeMinter(accounts[0])
      })
      .then(() => {
        return utils.addressShouldBeMinter(instance, accounts[0], false)
      })
  })

  it('deploy & mint 0', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[0], 0)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 0)
      })
  })

  it('deploy & mint > maxSupply', () => {

    let instance

    return CodexToken.new(1000000)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[0], 200000000000000000000000001)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000000)
      })
  })

  it('deploy & mint & finish minting & try mint', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return instance.finishMinting()
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
  })

  it('deploy & pause & mint & try approve', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.pause()
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return instance.approve(accounts[0], 2)
      })
      .catch(utils.catchReceiptShouldFailed)
      .then(() => {
        return instance.allowance(accounts[0], accounts[1])
      })
      .then(() => {
        return utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0)
      })
  })

  it('deploy & pause & mint & try increase approval', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.pause()
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return instance.increaseApproval(accounts[1], 10)
      })
      .catch(utils.catchReceiptShouldFailed)
      .then(() => {
        return instance.allowance(accounts[0], accounts[1])
      })
      .then(() => {
        return utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0)
      })
  })

  it('deploy & pause & mint & try decrease approval', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.pause()
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return instance.decreaseApproval(accounts[1], 10)
      })
      .catch(utils.catchReceiptShouldFailed)
      .then(() => {
        return instance.allowance(accounts[0], accounts[1])
      })
      .then(() => {
        return utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0)
      })
  })

  it('deploy & pause & mint & try to transfer', () => {

    let instance

    return CodexToken.new(0)
      .then((_instance) => {
        instance = _instance
      })
      .then(() => {
        return instance.pause()
      })
      .then(() => {
        return instance.mint(accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return instance.approve(accounts[0], 2)
      })
      .catch(utils.catchReceiptShouldFailed)
      .then(() => {
        return instance.transferFrom(accounts[0], accounts[2], 2)
      })
      .catch(utils.catchReceiptShouldFailed)
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[0], 1000)
      })
      .then(() => {
        return utils.balanceShouldEqualTo(instance, accounts[2], 0)
      })
  })
})
