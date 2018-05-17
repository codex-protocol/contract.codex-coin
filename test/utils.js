const gasToUse = 0x47E7C4

export default {
  receiptShouldSucceed(result) {
    return new Promise((resolve, reject) => {
      if (result.receipt.gasUsed === gasToUse) {
        try {
          assert.notEqual(result.receipt.gasUsed, gasToUse, 'tx failed, used all gas')
        } catch (error) {
          reject(error)
        }
      } else {
        console.log('gasUsed', result.receipt.gasUsed)
        resolve()
      }
    })
  },

  receiptShouldFailed(result) {
    return new Promise((resolve, reject) => {
      if (result.receipt.gasUsed === gasToUse) {
        resolve()
      } else {
        try {
          assert.equal(result.receipt.gasUsed, gasToUse, 'tx succeed, used not all gas')
        } catch (error) {
          reject(error)
        }
      }
    })
  },

  catchReceiptShouldFailed(error) {
    if (error.message.indexOf('invalid opcode') === -1 && error.message.indexOf('revert') === -1) {
      throw error
    }
  },

  balanceShouldEqualTo(instance, address, expectedBalance, notCall) {

    let promise

    if (notCall) {
      promise = instance.balanceOf(address)
        .then(() => {
          return instance.balanceOf.call(address)
        })
    } else {
      promise = instance.balanceOf.call(address)
    }

    return promise
      .then((balance) => {
        assert.equal(balance.valueOf(), expectedBalance, `balance should be equal to ${expectedBalance}`)
      })
  },

  timeout(seconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000)
    })
  },

  getEtherBalance(address) {
    return web3.eth.getBalance(address)
  },

  checkEtherBalance(address, expectedBalance) {
    const balance = web3.eth.getBalance(address)
    assert.equal(balance.valueOf(), expectedBalance.valueOf(), `address balance should be equal to ${expectedBalance}`)
  },

  getTxCost(result) {
    const tx = web3.eth.getTransaction(result.tx)
    return result.receipt.gasUsed * tx.gasPrice
  },

  totalShouldEqualTo(instance, expected) {
    return instance.totalSupply()
      .then((amount) => {
        assert.equal(amount.valueOf(), expected, `total should be equal to ${expected}`)
      })
  },

  pausedShouldEqualTo(instance, expected) {
    return instance.paused()
      .then((isPaused) => {
        assert.equal(isPaused.valueOf(), expected, `paused should be ${expected}`)
      })
  },

  allowanceShouldEqualTo(instance, address1, address2, expected) {
    return instance.allowance(address1, address2)
      .then((allowance) => {
        assert.equal(allowance.valueOf(), expected, `allowance should be ${expected}`)
      })
  },

  addressShouldBeMinter(instance, address, expected) {
    return instance.minters(address)
      .then((minters) => {
        assert.equal(minters.valueOf(), expected, 'address should be a minter')
      })
  },
}
