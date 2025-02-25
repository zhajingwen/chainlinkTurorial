// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FundToken {
    string public tokenName;
    string public  tokenSymbol;
    address public owner;
    uint256 public totalSupply;
    mapping(address => uint256) public balances;

    constructor(string memory _tokenName, string memory _tokenSymbol) {
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        owner = msg.sender;
    }
    // 铸造代币
    function mint(uint256 mintAmount) public {
        balances[msg.sender] += mintAmount;
        totalSupply += mintAmount;
    }

    // 转移代币
    function transfer(uint256 amount, address toAddress) public {
        require(balances[msg.sender] >= amount, "No enough balance  to transfer");
        balances[msg.sender] -= amount;
        balances[toAddress] += amount;
    }

    // 销毁代币
    function burn(uint256 amount) public {
        require(balances[msg.sender] >= amount, "No enough balance for you to burn");
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }

    // 查看某个地址的余额信息
    function balanceOf(address targetAddress) public view returns(uint256) {
        uint256 amount = balances[targetAddress];
        return amount;

    }
}