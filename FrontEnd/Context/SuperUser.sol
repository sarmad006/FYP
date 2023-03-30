//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "./Model.sol";

//contract address: 0xdFCBf665873c991A9BF5ae4C5619526ae4b55953

contract SuperUser{

    Model model;

    constructor(Model _model) {
        model = _model;
    }

    struct SuperUser{
        address superUser; 
    }



    mapping (address => bool ) isSuperUser;


    function registerSuperUser() public{
        require(!isSuperUser[msg.sender],"Already Registered");
        isSuperUser[msg.sender]=true;
    }

    function registerModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy,
        uint _modelsCombined) public
        {
            model.addGModel(_name,_ipfsHash,_jsonHash,_accuracy,_modelsCombined);
        }

    
    function aggregateModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy,
        uint _modelsCombined) public 
        {
            model.aggregateGModel(_name,_ipfsHash,_jsonHash,_accuracy,_modelsCombined);
        }

    function retrieveModelHashes(string memory _name) public view returns(string memory,string memory)
        {
            string memory ipfsHash = model.getGIpfs(_name);
            string memory jsonHash = model.getGJson(_name);
            return(ipfsHash,jsonHash);
        }

    function retrieveCustomModelHashes(string memory _name,uint _version) public view returns(string memory,string memory)
        {
            string memory ipfsHash = model.getCustomGIpfs(_name,_version);
            string memory jsonHash = model.getCustomGJson(_name,_version);
            return(ipfsHash,jsonHash);
        }
    function LatestModelInfo(string memory _modelName)public view returns (
        string memory,
        uint,
        uint,
        uint 
    )
    {
        return model.getLatestGModelInfo(_modelName);
    }
    function CustomModelInfo(string memory _modelName,uint _version)public view returns (
        string memory,
        uint,
        uint,
        uint 
    )
    {
        return model.getCustomGModelInfo(_modelName,_version);
    }
}