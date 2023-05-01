//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "./Model.sol";
import "./Authorization.sol";
// contract address :0xb615EB7bd0D1c4FCA2Af3C7BDA2f90950B917038

// token address : 0x6AF1D20A968eFaED25Ed9616B5ECaeB5D93af0ac

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Hospital {

    Model model;
    Authorization authorization;
    IERC20 public token;
    uint256 public withdrawalAmount = 1 * (10**18); // 1 token per Model Contribution

    mapping(address => uint) public dueTime; // This is Time-Constraint for Hospitals
    mapping(address => uint) public DocTokenBalance; // Mapping to check Token Balance of Each Hospital
    mapping(address => uint) public penaltyCount; // Keep track of Penalty Count
    mapping(address => bool) public isBanned; // Mapping to check if Hospital is Banned ?

    constructor(Model _model,Authorization _authorization,address tokenAddress) {
        model = _model;
        authorization = _authorization;
        token = IERC20(tokenAddress);
    }


    uint public counter=0;
    struct Hospital{
        string name;
        string city;
        string email;
        string phone;
        address metamask;
    }

    //Hospital accessing model information
    function addLocalModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy) public
        {
            model.addLocalModel(_name,_ipfsHash,_jsonHash,_accuracy,msg.sender);
            require(msg.sender != address(0),"Request must not originate from a zero account");
            require(token.balanceOf(address(this)) >= withdrawalAmount,"Insufficient balance in faucet for withdrawal request");
            token.transfer(msg.sender, withdrawalAmount);
            dueTime[msg.sender]=block.timestamp + 15 days;
            DocTokenBalance[msg.sender]++;
        }

    function updateModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy) public
        {
            model.updateLocalModel(_name,_ipfsHash,_jsonHash,_accuracy,msg.sender);
            if(block.timestamp <= dueTime[msg.sender])
            {
                require(msg.sender != address(0),"Request must not originate from a zero account");
                require(token.balanceOf(address(this)) >= withdrawalAmount,"Insufficient balance in faucet for withdrawal request");
                DocTokenBalance[msg.sender]++;
                token.transfer(msg.sender, withdrawalAmount);
                dueTime[msg.sender]=block.timestamp + 15 days;
            }
            else{
                penaltyCount[msg.sender]++;
                dueTime[msg.sender]=block.timestamp + 15 days;
            }
        }

    receive() external payable {   
    }

    function getBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function AccessAllowed() external returns (bool) {
        if(penaltyCount[msg.sender]>=3){
            isBanned[msg.sender]=true;
            return false;
        }else{
            return true;
        }
    }

    function MinimumAccuracy(string memory _name) external view returns(uint){
        return model.MinAccuracyRequired(_name);
    }

    //Hospital accessing model information

    function getHashes(string memory _name,uint _version) public view returns(string memory,string memory)
    {
        string memory ipfsHash = model.getLocalIpfs(_name,_version,msg.sender);
        string memory jsonHash =  model.getLocalJson(_name,_version,msg.sender);
        return(ipfsHash,jsonHash);
    }

    function getModelInfo(string memory _name,uint _version)public view returns (
        string memory ,
        uint,
        uint
    )
    {
        return model.getLocalModelInfo(_name,_version,msg.sender);
    }

    Hospital[] public hospitals;
    mapping(address => uint) public index;
    mapping (address => bool) public registeredHospital;



    modifier notRegister(address _address){
        require(!registeredHospital[_address],"Already Registered");
        _;
    }

    function registerHospital(string memory _name ,string memory _city, string memory _email,string memory _phone,address _metamask) public notRegister(msg.sender){
          hospitals.push(
            Hospital({
                name:_name,
                city:_city,
                email:_email,
                phone:_phone,
                metamask:_metamask
            }) //0x36A725d0A8CbC3e9f5e0a1b9b4625c0f4FfCcb40
        );
            registeredHospital[msg.sender]=true;
            index[msg.sender]=counter;
            authorization.validateHospital(_metamask);
            counter++;
    }

    function getHospitals() public view returns(Hospital[] memory){
        return hospitals;
    }

    function getIndex(address _hospital) public view returns(uint){
        return index[_hospital];
    }

    function checkLocalModelExists(string memory _name)external view returns (bool){
        bool val = model.registerLModel(_name,msg.sender);
        return val;
    }

    
   
}
