const { ethers }    = require("hardhat");
const fs            = require('fs');
const path          = require('path');
const { expect }    = require("chai");

const {expectRevert}    = require('@openzeppelin/test-helpers');


// Contract instance variable
let provider, signer, daoInstance, atacanteInstance;

// Constant
const fileName = "Attack";
const daoContract = "DAO";
const atacanteContract = "atacante";

describe(fileName || " Contract test", () => {
    before(async() => {
        console.log("------------------------------------------------------------------------------------");
        console.log("--", fileName, "Contract Test Start");
        console.log("------------------------------------------------------------------------------------"); 

        // Get provider and Signer
        provider = ethers.provider;
        [signer] = await ethers.getSigners();

        // Deploy contract
        const daoPath               = "contracts/" + fileName + ".sol:" + daoContract;
        const atacantePath          = "contracts/" + fileName + ".sol:" + atacanteContract;
        const daoFactory            = await ethers.getContractFactory(daoPath, signer, );
        const atacanteFactory       = await ethers.getContractFactory(atacantePath, signer, );
        daoInstance                 = await daoFactory.deploy({value:1000});
        atacanteInstance            = await atacanteFactory.deploy(daoInstance.address, {value:10});

        console.log('daoInstance address:', daoInstance.address);
        console.log('atacanteInstance address:', atacanteInstance.address);
    });

    it("Check balance before", async() => {
        const daoBalance = await daoInstance.getBalance();
        const atacanteBalance = await atacanteInstance.getBalance();
        
        console.log("DAO Balance:", parseInt(daoBalance));
        console.log("Atacante Balance:", parseInt(atacanteBalance));

        expect(parseInt(daoBalance)).to.be.equals(1000);
        expect(parseInt(atacanteBalance)).to.be.equals(10);
    });

    it("Call deposit", async() => {
        const tx = await atacanteInstance.deposit();
        const confirmations_number  =  1;
        tx_result                   = await provider.waitForTransaction(tx.hash, confirmations_number);
        if(tx_result.confirmations < 0 || tx_result === undefined) {
            throw new Error(contractToDeploy || " Contract ERROR: Transaction is undefined or has 0 confirmations.");
        }
    });

    it("Check balance after deposit", async() => {
        const daoBalance = await daoInstance.getBalance();
        const atacanteBalance = await atacanteInstance.getBalance();

        console.log("DAO Balance:", parseInt(daoBalance));
        console.log("Atacante Balance:", parseInt(atacanteBalance));

        expect(parseInt(daoBalance)).to.be.equals(1010);
        expect(parseInt(atacanteBalance)).to.be.equals(0);
    });

    it("Call Attack", async() => {
        const tx = await atacanteInstance.attackStart({gasLimit:10000000});

        const confirmations_number  =  1;
        tx_result                   = await provider.waitForTransaction(tx.hash, confirmations_number);
        if(tx_result.confirmations < 0 || tx_result === undefined) {
            throw new Error(contractToDeploy || " Contract ERROR: Transaction is undefined or has 0 confirmations.");
        }
    });

    it("Check balance after", async() => {
        const daoBalance = await daoInstance.getBalance();
        const atacanteBalance = await atacanteInstance.getBalance();

        console.log("DAO Balance:", parseInt(daoBalance));
        console.log("Atacante Balance:", parseInt(atacanteBalance));
        
        expect(parseInt(daoBalance)).to.be.equals(0);
        expect(parseInt(atacanteBalance)).to.be.equals(1010);
    });
});