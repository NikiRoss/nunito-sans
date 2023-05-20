pragma solidity ^0.8.0;

contract TipsContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function getAddress() public view returns (address) {
        return owner;
    }

    function sendTip(address payable recipient, uint amount) public payable {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Invalid tip amount");
        require(msg.value >= amount, "Insufficient funds");

        bool sent = false;
        (sent, ) = recipient.call{value: amount}("");
        require(sent, "Tip transfer failed");
    }
}
