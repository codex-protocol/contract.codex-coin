module.exports = function(error, msg = 'invalid opcode') {
    assert.isAbove(error.message.search(msg), -1, 'Invalid opcode error must be returned');
}