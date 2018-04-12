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
function getPhase (instance, id) {
  return instance.phases.call(id)
    .then(function (obj) {
      if (obj.length === 3) {
        return {
          priceShouldMultiply: obj[0].valueOf(),
          price: obj[1].valueOf(),
          maxAmount: obj[2].valueOf(),
        };
      }
      if (obj.length === 7) {
        return {
          price: obj[0].valueOf(),
          maxAmount: obj[1].valueOf(),
          since: obj[2].valueOf(),
          till: obj[3].valueOf(),
          tokensSold: obj[4].valueOf(),
          collectedEthers: obj[5].valueOf(),
          isFinished: obj[6].valueOf(),
        };
      }

      if (obj.length === 6) {
        return {
          price: obj[0].valueOf(),
          since: obj[1].valueOf(),
          till: obj[2].valueOf(),
          tokensSold: obj[3].valueOf(),
          collectedEthers: obj[4].valueOf(),
          isFinished: obj[5].valueOf(),
        };
      }

      return {
        price: obj[0].valueOf(),
        maxAmount: obj[1].valueOf(),
      };
    });
}

function checkPhase (phase, price, since, till, tokensSold, collectedEthers, isFinished) {
  return new Promise(function (resolve, reject) {
    try {
      assert.equal(phase.price, price, 'phase price is not equal');
      assert.equal(phase.since, since, 'phase since is not equal');
      assert.equal(phase.till, till, 'phase till is not equal');
      assert.equal(phase.tokensSold, tokensSold, 'phase tokensSold is not equal');
      assert.equal(phase.collectedEthers, collectedEthers, 'phase collectedEthers is not equal');
      assert.equal(phase.isFinished, isFinished, 'phase isFinished is not equal');

      resolve();
    } catch (err) {
      reject(err);
    }
  });
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

function lockedShouldEqualTo (instance, expected) {
  return new Promise(function (resolve, reject) {
    var promise;

    promise = instance.locked();

    promise.then(function (boo) {
      assert.equal(boo.valueOf(), expected, 'locked should be ' + expected);
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

function freezeShouldEqualTo (instance, expected) {
  return new Promise(function (resolve, reject) {
    var promise;

    promise = instance.transferFrozen();

    promise.then(function (boo) {
      assert.equal(boo.valueOf(), expected, 'transferFrozen should be  ' + expected);
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
  getPhase: getPhase,
  checkPhase: checkPhase,
  getTxCost: getTxCost,
  totalShouldEqualTo: totalShouldEqualTo,
  lockedShouldEqualTo: lockedShouldEqualTo,
  freezeShouldEqualTo: freezeShouldEqualTo,
  allowanceShouldEqualTo: allowanceShouldEqualTo,
  addressShouldBeMinter: addressShouldBeMinter,
};
