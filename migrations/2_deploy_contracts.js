const CodexToken = artifacts.require('./CodexToken.sol')

module.exports = (deployer, network, accounts) => {
  if (network === 'ganache') {
    deployer.deploy(CodexToken, 0)
  }
}
