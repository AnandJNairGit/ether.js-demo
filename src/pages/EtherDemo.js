import React, { useEffect } from "react";
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/797abed6c90a459fa3bf2fa491d0f6cf"
);

const EtherDemo = () => {

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


  useEffect(() => {
    queryBlockchain();
  });

  return <div>etherDemo</div>;
};

export default EtherDemo;
