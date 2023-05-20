module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port is 8545
        network_id: "*",       // Any network (default: none)
      },
    },
  
    // Configure your compilers
    compilers: {
      solc: {
        version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      }
    },
  };
  