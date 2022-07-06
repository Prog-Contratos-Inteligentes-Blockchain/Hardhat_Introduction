//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract MyContract {
    uint256 constant public VERSION = 100;

    address public owner;

    event MyEvent(uint256 indexed index, address indexed sender, string text);
    
    constructor() {
        owner = msg.sender;
    }

    function getBalance() external view returns(uint256) {
        return address(this).balance; 
    }

    function emitEvent(uint256 _index, string memory _text) external {
        emit MyEvent(_index, msg.sender, _text);
    }

    function setOwner() external {
        require(1 == 2, "Never valid");
        owner = msg.sender;
    }

}