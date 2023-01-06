// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Wallet {
    uint8 value = 1;
    string public walletName = "Anand's wallet";

    function setValue(uint8 _value) public{
        value= _value;
    }

    function getValue() public view returns(uint8 _value){
        return value;
    }

    //To receive ETH
    function sendETH() public payable {}

    //To get the contract balance
    function getContractBalance() public view returns(uint _balance){
        return address(this).balance;
    }

    // To transferr ETH to the provided address
    function transferETH(address _accountAddress) public payable{
        payable(_accountAddress).transfer(msg.value);
    }
    
    // To get the balance of provided account address
    function getAccountBalance(address _accountAddress) public view returns(uint _accountBalance)
    {
        return address(_accountAddress).balance;
    }



}