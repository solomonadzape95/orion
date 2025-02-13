// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    mapping(address => uint256) public balances;
    
    function set(uint256 x) public {
        storedData = x;
        balances[msg.sender] = x;
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
    
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);  // Potential reentrancy vulnerability
    }
}
