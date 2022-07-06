const { ethers }    = require("hardhat");
const fs            = require('fs');
const path          = require('path');
//const { expect }    = require("chai");

const {expectRevert}    = require('@openzeppelin/test-helpers');

const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const { expect } = chai;


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






    it("Emit event test", async() => {
        await deployedContractInstance.emitEvent(1, 'Hola Mundo');
        await deployedContractInstance.emitEvent(2, 'Chau Mundo');
    });





    it("Read Event with contract test", async() => {
        const index = 2;
        const result = await deployedContractInstance.filters.MyEvent(index, signer.address);
        
        console.log('-------------------------------------------------------------------------');
        console.log('Contract address:', deployedContractInstance.address);
        console.log('Topics:');
        console.log('Index (Topic 1):\t', parseInt(result.topics[1]));
        console.log('Event signature (Topic 0):', result.topics[0]);
        console.log('Signer Address (Topic 2):', ethers.utils.hexlify(result.topics[2]));
        console.log('-------------------------------------------------------------------------');
        const eventName = 'MyEvent(uint256,address,string)';
        const eventNameId = ethers.utils.id(eventName);
        console.log('Event signature:', eventNameId);
        console.log('Signer address:\t', signer.address);
        
        //console.log(ethers.utils.id("Hola Mundo"));
        //console.log(ethers.utils.id("Cahu Mundo"));
    });

    
    it("Error test", async() => {
        await expect(deployedContractInstance.setOwner()).to.be.revertedWith("Never valid");
    });
    
});