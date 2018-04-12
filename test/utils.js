const gasToUse = 0x47E7C4;

function receiptShouldSucceed (result) {
  return new Promise(function (resolve, reject) {
    if (result.receipt.gasUsed === gasToUse) {
      try {
        assert.notEqual(result.receipt.gasUsed, gasToUse, 'tx failed, used all gas');
      } catch (err) {
        reject(err);
      }
    } else {
      console.log('gasUsed', result.receipt.gasUsed);
      resolve();
    }
  });
}

function receiptShouldFailed (result) {
  return new Promise(function (resolve, reject) {
    if (result.receipt.gasUsed === gasToUse) {
      resolve();
    } else {
      try {
        assert.equal(result.receipt.gasUsed, gasToUse, 'tx succeed, used not all gas');
      } catch (err) {
        reject(err);
      }
    }
  });
}

function catchReceiptShouldFailed (err) {
  if (err.message.indexOf('invalid opcode') === -1 && err.message.indexOf('revert') === -1) {
    throw err;
  }
}

function balanceShouldEqualTo (instance, address, expectedBalance, notCall) {
  return new Promise(function (resolve, reject) {
    var promise;

    if (notCall) {
      promise = instance.balanceOf(address)
        .then(function () {
          return instance.balanceOf.call(address);
        });
    } else {
      promise = instance.balanceOf.call(address);
    }

    promise.then(function (balance) {
      assert.equal(balance.valueOf(), expectedBalance, 'balance is not equal');
      resolve();
    }).catch(function (error) {
      reject(error);
    });
  });
}

function timeout (timeout) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, timeout * 1000);
  });
}

function getEtherBalance (_address) {
  return web3.eth.getBalance(_address);
}

function checkEtherBalance (_address, expectedBalance) {
  var balance = web3.eth.getBalance(_address);

  assert.equal(balance.valueOf(), expectedBalance.valueOf(), 'address balance is not equal');
}

function getTxCost (result) {
  var tx = web3.eth.getTransaction(result.tx);

  return result.receipt.gasUsed * tx.gasPrice;
}

function totalShouldEqualTo (instance, expected) {
  return new Promise(function (resolve, reject) {
    var promise;

    promise = instance.totalSupply();

    promise.then(function (amount) {
      assert.equal(amount.valueOf(), expected, 'total is not equal');
      resolve();
    }).catch(function (error) {
      reject(error);
    });
  });
}

function pausedShouldEqualTo (instance, expected) {
  return new Promise(function (resolve, reject) {
    var promise;

    promise = instance.paused();

    promise.then(function (boo) {
      assert.equal(boo.valueOf(), expected, 'paused should be ' + expected);
      resolve();
    }).catch(function (error) {
      reject(error);
    });
  });
}

function allowanceShouldEqualTo (instance, acc1, acc2, expected) {
  return new Promise(function (resolve, reject) {
    var promise;

    promise = instance.allowance(acc1, acc2);

    promise.then(function (boo) {
      assert.equal(boo.valueOf(), expected, 'allowance should be ' + expected);
      resolve();
    }).catch(function (error) {
      reject(error);
    });
  });
}

function addressShouldBeMinter (instance, acc, expected) {
  return new Promise(function (resolve, reject) {
    var promise;

    promise = instance.minters(acc);

    promise.then(function (boo) {
      assert.equal(boo.valueOf(), expected, 'It is not a minter');
      resolve();
    }).catch(function (error) {
      reject(error);
    });
  });
}

module.exports = {
  receiptShouldSucceed: receiptShouldSucceed,
  receiptShouldFailed: receiptShouldFailed,
  catchReceiptShouldFailed: catchReceiptShouldFailed,
  balanceShouldEqualTo: balanceShouldEqualTo,
  timeout: timeout,
  getEtherBalance: getEtherBalance,
  checkEtherBalance: checkEtherBalance,
  getTxCost: getTxCost,
  totalShouldEqualTo: totalShouldEqualTo,
  pausedShouldEqualTo: pausedShouldEqualTo,
  allowanceShouldEqualTo: allowanceShouldEqualTo,
  addressShouldBeMinter: addressShouldBeMinter,
};
