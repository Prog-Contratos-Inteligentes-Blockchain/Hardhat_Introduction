//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract MyContract {
    uint256 constant public VERSION = 100;

    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    function getBalance() external view returns(uint256) {
        return address(this).balance; 
    }

}