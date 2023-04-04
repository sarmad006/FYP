//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "./Model.sol";
import "./Authorization.sol";
// contract address : 0xBCDdbaCda3f3F350e421E92f2b8D73e2b2C8701a

contract Hospital {

    Model model;
    Authorization authorization;

    constructor(Model _model,Authorization _authorization) {
        model = _model;
        authorization = _authorization;
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
            model.addLocalModel(_name,_ipfsHash,_jsonHash,_accuracy);
        }

    function updateModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy) public
        {
            model.updateLocalModel(_name,_ipfsHash,_jsonHash,_accuracy);
        }

    function getHashes(string memory _name,uint _version) public view returns(string memory,string memory)
    {
        string memory ipfsHash = model.getCustomLIpfs(_name,_version);
        string memory jsonHash =  model.getCustomLJson(_name,_version);
        return(ipfsHash,jsonHash);
    }

    function getModelInfo(string memory _name,uint _version)public view returns (
        string memory,
        uint,
        uint
    )
    {
        return model.getCustomLModelInfo(_name,_version);
    }
    // function predictModel(string memeory name,uint version){}

    Hospital[] public hospitals;
    mapping(address => uint) public index;
    mapping (address => bool) public registeredHospital;

    modifier notRegister(address _address){
        require(!registeredHospital[_address],"Already Registered");
        _;
    }

    function registerHospital(string memory _name ,string memory _city, string memory _email,string memory _phone,string memory _modelHash,address _metamask) public notRegister(msg.sender){
          hospitals.push(
            Hospital({
                name:_name,
                city:_city,
                email:_email,
                phone:_phone,
                metamask:_metamask
            })
        );
            registeredHospital[msg.sender]=true;
            index[msg.sender]=counter;
            authorization.isHospital[msg.sender]=true;
            counter++;
    }

    function getHospitals() public view returns(Hospital[] memory){
        return hospitals;
    }

    function getIndex(address _hospital) public view returns(uint){
        return index[_hospital];
    }  
}