var Ownable = artifacts.require("./Ownable.sol");


let Utils = require("./utils");

let BigNumber = require('bignumber.js');


contract('Ownable', function(accounts) {
    let ownable;
    let other = accounts[2]

    beforeEach(async function() {
        ownable = await Ownable.new();
    });

    it('should have an owner', async function() {
        let owner = await ownable.owner();
        assert.isTrue(owner !== 0);
    });

    it('changes owner after accept', async function() {
        let other = accounts[1];
        await ownable.transferOwnership(other);
        let owner = await ownable.owner();

        assert.isTrue(other !== owner);
        await ownable.acceptOwnership({from:other})
        .then(Utils.receiptShouldSucceed)
        owner = await ownable.owner();
        assert.isTrue(other === owner);
    });

    it('should prevent non-owners from transfering', async function() {
        let owner = await ownable.owner.call()
        assert.isTrue(owner !== other)
        ownable.transferOwnership(other, {from: other})
        .then(Utils.receiptShouldFailed)
        .catch(Utils.catchReceiptShouldFailed)
    });

    it('should guard ownership against stuck state', async function() {
        let originalOwner = await ownable.owner();
        await ownable.transferOwnership(null, {from: originalOwner})
        .then(Utils.receiptShouldFailed)
        .catch(Utils.catchReceiptShouldFailed)
    });

});