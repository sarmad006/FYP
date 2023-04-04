//SPDX-License-Identifier:MIT


pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

    /**
    * @title ContractName
    * @dev ContractDescription
    * @custom:dev-run-script file_path
       */

contract LocalModel{

    constructor(){}

    struct localModel{
        address hospital;
        string name;
        string ipfsHash;
        string jsonHash;
        uint accuracy; 
        uint version;
    }

    mapping(address => mapping(string => mapping(uint => localModel))) public localModels;
    mapping (string => mapping(address => bool)) public registerLocalModel;  
    mapping(string => uint ) public LocalModelId;
    mapping(string => mapping(address => uint )) public LVersion;


    function checkModelExist(string memory _name,address _msgSender) private {
        require(!registerLocalModel[_name][_msgSender],"Already Exists");
        registerLocalModel[_name][_msgSender]=true;
        LVersion[_name][_msgSender]=0;
    }

    function addLocalModel(string memory _name,string memory _ipfsHash,string memory _jsonHash,
    uint _accuracy ) external {
        checkModelExist(_name,msg.sender);
        uint lversion = LVersion[_name][msg.sender];
        localModels[msg.sender][_name][lversion].name=_name;
        localModels[msg.sender][_name][lversion].ipfsHash=_ipfsHash;
        localModels[msg.sender][_name][lversion].jsonHash=_jsonHash;
        localModels[msg.sender][_name][lversion].accuracy=_accuracy;
        localModels[msg.sender][_name][lversion].hospital=msg.sender;
        localModels[msg.sender][_name][lversion].version=lversion;
        LVersion[_name][msg.sender]+=1;
    }

    function updateLocalmodel(string memory _name,string memory _ipfsHash,
        string memory _jsonHash,uint _accuracy) external
        {
            require(registerLocalModel[_name][msg.sender],"Does not Exist");
            uint cversion=LVersion[_name][msg.sender];
            localModels[msg.sender][_name][cversion].name=_name;
            localModels[msg.sender][_name][cversion].ipfsHash=_ipfsHash;
            localModels[msg.sender][_name][cversion].jsonHash=_jsonHash;
            localModels[msg.sender][_name][cversion].accuracy=_accuracy;
            localModels[msg.sender][_name][cversion].version=cversion;
            localModels[msg.sender][_name][cversion].hospital=msg.sender;
            LVersion[_name][msg.sender]+=1;
        }

    function getIpfsLocalModel(string memory _name,uint _version) external view returns(string memory){
        return localModels[msg.sender][_name][_version].ipfsHash;
    }

    function getJsonLocalModel(string memory _name,uint _version) external view returns(string memory){
        return localModels[msg.sender][_name][_version].jsonHash;
    }

    function getInfoLocalModel(string memory _name,uint _version) external view returns (
        string memory,uint,uint)
    {
        return(
            localModels[msg.sender][_name][_version].name,
            localModels[msg.sender][_name][_version].accuracy,
            localModels[msg.sender][_name][_version].version
        );     
    }
}