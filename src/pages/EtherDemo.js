import React, { useEffect } from "react";
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/797abed6c90a459fa3bf2fa491d0f6cf"
);

const EtherDemo = () => {

  const walletAddres = "0xa353b60791b301fec2700db69af541b52166cd28";
  const walletABI = [
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_accountAddress",
         "type": "address"
       }
     ],
     "name": "getAccountBalance",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "_accountBalance",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "getContractBalance",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "_balance",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "getValue",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "_value",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "sendETH",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint8",
         "name": "_value",
         "type": "uint8"
       }
     ],
     "name": "setValue",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_accountAddress",
         "type": "address"
       }
     ],
     "name": "transferETH",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "walletName",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   }
 ]
  

  const queryBlockchain = async () => {
    //to get the blocknumber
    const block = await provider.getBlockNumber();
    console.log("the current block number is----------->", block);

    //to get the balance of given address
    const balance =await provider.getBalance("0x690b9a9e9aa1c9db991c7721a92d351db4fac990");
    console.log("the balance (in bignumber object) is ----------->", balance);

    //to format from bignumber object to readable form
    const formattedBalance = ethers.utils.formatEther(balance);
    console.log("the formatted balance ether is-------->", formattedBalance);

    //to get balance in wei format
    const balanceWei = ethers.utils.parseEther(formattedBalance)
    console.log("the balance in wei ------------>", balanceWei);

    //to format from bignumber object to readable form
    const formattedBalanceWei = ethers.utils.formatEther(balanceWei);
    console.log("the formatted balance ether is-------->", formattedBalanceWei);
  }
  
  
 //TO INTERACT WITH THE SMART CONTRACT
  const interactSmartContractRead = async () =>{
  //calling the read functions of contract

  const walletContractObj = new ethers.Contract(walletAddres, walletABI, provider);
  
 const contractName = await walletContractObj.walletName();
 console.log("the contract name is -------------->", contractName);

 const value = await walletContractObj.getValue();
 console.log("the value is----------->", value);

 const contractBalance = await walletContractObj.getContractBalance();
 console.log("the contract balance is------------->", contractBalance);
 console.log("the formatted contract balance is----------->", ethers.utils.formatEther(contractBalance));


 const accountBalance = await walletContractObj.getAccountBalance("0xDD92c9Be86316ddF0cB47a20516720E32313EF8c");
 console.log("the account balance is------------->", accountBalance);
 console.log("the formatted account balance is----------->", ethers.utils.formatEther(accountBalance));

  }

  //this interaction with contract changes the state variable
  const interactSmartContractWrite = async() =>{
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    await _provider.send("eth_requestAccounts",[]);

    const signer= _provider.getSigner();
    const contract = new ethers.Contract(walletAddres, walletABI, signer);
    // await contract.setValue(2);
    // await contract.sendETH({value:ethers.utils.parseEther("0.00005")})
    await contract.transferETH("0x25496EC859b5AE429EaDe35ed99bA44A1D0b6641",{value:ethers.utils.parseEther("0.00005")}) 


    
  }


  useEffect(() => {
    // queryBlockchain();
    // interactSmartContractRead();
    interactSmartContractWrite();
  });

  return <div>etherDemo</div>;
};

export default EtherDemo;


// 0xa353b60791b301fec2700db69af541b52166cd28