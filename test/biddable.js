import Utils from './utils';

const Biddable = artifacts.require('../contracts/Biddable.sol');

contract('Biddable', function (accounts) {
  it('deploy & check for total', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(() => Utils.totalShouldEqualTo(instance, 1000000));
  });

  it('deploy & lock contract', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(() => instance.setLocked(true))
      .then(() => Utils.lockedShouldEqualTo(instance, true));
  });

  it('deploy & freeze contract', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(() => instance.freezing(true))
      .then(() => Utils.freezeShouldEqualTo(instance, true));
  });

  it('deploy & mint', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000));
  });

  it('deploy & mint & transfer', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000))
      .then(function () {
        return instance.transfer(accounts[1], 10);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[1], 10))
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 990));
  });

  it('deploy & mint & approve & transfer from account', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000))
      .then(function () {
        return instance.approve(accounts[0], 2);
      })
      .then(function () {
        return instance.transferFrom(accounts[0], accounts[2], 2);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 998))
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[2], 2));
  });

  it('deploy & mint & approve & decrease approve', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[1], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[1], 1000))
      .then(function () {
        return instance.approve(accounts[1], 20);
      })
      .then(function () {
        return instance.decreaseApproval(accounts[1], 10);
      })
      .then(function () {
        return instance.allowance(accounts[0], accounts[1]);
      })
      .then(() => Utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 10));
  });

  it('deploy & mint & approve & try to decrease on value bigger then exists', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[1], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[1], 1000))
      .then(function () {
        return instance.approve(accounts[1], 20);
      })
      .then(function () {
        return instance.decreaseApproval(accounts[1], 30);
      })
      .then(function () {
        return instance.allowance(accounts[0], accounts[1]);
      })
      .then(() => Utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0));
  });

  it('deploy & mint & approve & increase approve', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[1], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[1], 1000))
      .then(function () {
        return instance.approve(accounts[1], 20);
      })
      .then(function () {
        return instance.increaseApproval(accounts[1], 10);
      })
      .then(function () {
        return instance.allowance(accounts[0], accounts[1]);
      })
      .then(() => Utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 30));
  });

  it('deploy & add minter', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(() => Utils.totalShouldEqualTo(instance, 1000000))
      .then(function () {
        return instance.addMinter(accounts[0]);
      })
      .then(() => Utils.addressShouldBeMinter(instance, accounts[0], true));
  });

  it('deploy & remove minter', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(() => Utils.totalShouldEqualTo(instance, 1000000))
      .then(function () {
        return instance.addMinter(accounts[0]);
      })
      .then(function () {
        return instance.removeMinter(accounts[0]);
      })
      .then(() => Utils.addressShouldBeMinter(instance, accounts[0], false));
  });

  it('deploy & mint 0', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 0);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 0));
  });

  it('deploy & mint > maxSupply', function () {
    var instance;

    return Biddable.new(
      1000000,
      false
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 200000000000000000000000001);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 0));
  });

  it('deploy locked & mint & try approve', function () {
    var instance;

    return Biddable.new(
      1000000,
      true
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000))
      .then(function () {
        return instance.approve(accounts[0], 2);
      })
      .then(function () {
        return instance.allowance(accounts[0], accounts[1]);
      })
      .then(() => Utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0));
  });

  it('deploy locked & mint & try increase approval', function () {
    var instance;

    return Biddable.new(
      1000000,
      true
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000))
      .then(function () {
        return instance.increaseApproval(accounts[1], 10);
      })
      .then(function () {
        return instance.allowance(accounts[0], accounts[1]);
      })
      .then(() => Utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0));
  });

  it('deploy locked & mint & try decrease approval', function () {
    var instance;

    return Biddable.new(
      1000000,
      true
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000))
      .then(function () {
        return instance.decreaseApproval(accounts[1], 10);
      })
      .then(function () {
        return instance.allowance(accounts[0], accounts[1]);
      })
      .then(() => Utils.allowanceShouldEqualTo(instance, accounts[0], accounts[1], 0));
  });

  it('deploy locked & mint & try to transfer', function () {
    var instance;

    return Biddable.new(
      1000000,
      true
    ).then(function (_instance) {
      instance = _instance;
    })
      .then(function () {
        return instance.mint(accounts[0], 1000);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000))
      .then(function () {
        return instance.approve(accounts[0], 2);
      })
      .then(function () {
        return instance.transferFrom(accounts[0], accounts[2], 2);
      })
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[0], 1000))
      .then(() => Utils.balanceShouldEqualTo(instance, accounts[2], 0));
  });
});
