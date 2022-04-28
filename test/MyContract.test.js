const { ethers }    = require("hardhat");
const fs            = require('fs');
const path          = require('path');
const { expect }    = require("chai");

// Contract instance variable
let provider, signer, deployedContractInstance;

// Constant
const contractName              = "MyContract";

describe(contractName || " Contract test", () => {
    before(async() => {
        console.log("------------------------------------------------------------------------------------");
        console.log("--", contractName, "Contract Test Start");
        console.log("------------------------------------------------------------------------------------"); 

        // Get provider and Signer
        provider = ethers.provider;
        [signer] = await ethers.getSigners();

        // Deploy contract
        const contractPath          = "contracts/" + contractName + ".sol:" + contractName;
        const contractFactory       = await ethers.getContractFactory(contractPath, signer, );
        deployedContractInstance    = await contractFactory.deploy();

    });

    it("Check Owner account", async() => {
        const owner = await deployedContractInstance.owner();
        console.log("Contract owner:", owner);
        expect(owner).to.be.equals(signer.address);
    });

    it("Get balance", async() => {
        const balance = await deployedContractInstance.getBalance();
        console.log("Contract balance:", parseInt(balance));
        expect(parseInt(balance)).to.be.equals(0);
    });
});