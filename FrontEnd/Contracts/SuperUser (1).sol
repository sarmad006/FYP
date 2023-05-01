//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "./Model.sol";
import "./Authorization.sol";

//contract address: 0xdFCBf665873c991A9BF5ae4C5619526ae4b55953
// latest address : 0xF04e79b185A328c724568683f5053e62bc63cBd6

contract SuperUser{

    Model model;
    Authorization authorization;

    constructor(Model _model,Authorization _authorization) {
        model = _model;
        authorization = _authorization;
    }

    
    mapping (address => bool ) isSuperUser;


    function registerSuperUser() public{
        require(!isSuperUser[msg.sender],"Already Registered");
        isSuperUser[msg.sender]=true;
        authorization.validateSuperUser(msg.sender);
    }

    function registerModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy
        ) public
        {
            model.addGlobalModel(_name,_ipfsHash,_jsonHash,_accuracy);
        }

    
    function aggregateModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy,
        uint _modelsCombined) public 
        {
            model.aggregateGlobalModel(_name,_ipfsHash,_jsonHash,_accuracy,_modelsCombined);
        }


    function retrieveGlobalModelHashes(string memory _name,uint _version) public view returns(string memory,string memory)
        {
            string memory ipfsHash = model.getGlobalIpfs(_name,_version);
            string memory jsonHash = model.getGlobalJson(_name,_version);
            return(ipfsHash,jsonHash);
        }
    
    function GlobalModelInfo(string memory _modelName,uint _version)public view returns (
        string memory name,
        uint accuracy,
        uint modelsCombined,
        uint version
    )
    {
        return model.getGlobalModelInfo(_modelName,_version);
    }

    function getVersion(string memory _name) public view returns(uint){
        return model.gVersion(_name);
    }
}