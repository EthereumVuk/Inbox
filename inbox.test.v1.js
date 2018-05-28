const assert = require('assert'); // assertions about test module
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Web3 is the constructor function - to create instances of the Web3 library
const web3 = new Web3(ganache.provider()); // instance of the web3
const { interface, bytecode } = require('../compile');

let accounts; // variable initialization
let inbox; // variable initialization

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts(); // every function that we call with web3 is async
        
    // Use one of those accounts to deploy the contract
    // Teaches web3 about what methods an inbox contract has
    inbox = await new web3.eth.Contract(JSON.parse(interface)) //parse JSON to get the Javascript object
        // Tells web3 that we want to deploy a new copy of this contract
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        // Instructs web3 to send out a transaction that creates this contract
        .send({ from: accounts[0], gas: '1000000' })
}); 

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
});
