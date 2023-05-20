const TipsContract = artifacts.require("TipsContract");

module.exports = function(deployer) {
  deployer.deploy(TipsContract);
};
