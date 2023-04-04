//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

contract GlobalModel{
    
    // contract address : 0xC55B7753bAB3e64c72098133850667595Af398B7
    uint public count=0;

    constructor(){

    }

    struct globalModel{
        string name;
        string ipfsHash;
        string jsonHash;
        uint accuracy;
        uint modelsCombined;
        uint version;
        uint id;
    
    }

    globalModel[] public globalModels;

    mapping(uint => mapping(uint => GlobalModel)) public GModel;
    
    mapping(string => uint ) public modelId;
    mapping(string => uint) public gVersion;
    mapping(string => bool) public registerGModel;

     // json  QmPU1HoNnrBUWTfLnDzHeA8sbgGr7n2V6SUHpxehrZCTPV
    

    function registerModel(string memory _name) public{
       require(!registerGModel[_name],"Already Exists");
       registerGModel[_name]=true;
       gVersion[_name]=0;
    }

    // Global Model Setter Methods

    function addGModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy,
        uint _modelsCombined        
       ) public 
       {
           registerModel(_name);
           uint Gversion=gVersion[_name];
           GModel[count][Gversion].name=_name;
           GModel[count][Gversion].ipfsHash=_ipfsHash;
           GModel[count][Gversion].jsonHash=_jsonHash;
           GModel[count][Gversion].accuracy=_accuracy;
           GModel[count][Gversion].modelsCombined=_modelsCombined;
           GModel[count][Gversion].id=count;
           GModel[count][Gversion].version=Gversion;
           gVersion[_name]+=1;
           modelId[_name]=count;
           

           globalModels.push(GlobalModel({
               name:_name,
               ipfsHash:_ipfsHash,
               jsonHash:_jsonHash,
               accuracy:_accuracy,
               modelsCombined:_modelsCombined,
               id:count,
               version:Gversion
           }));
            count++;
    }

    function aggregateGlobalModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy,
        uint _modelsCombined  
    ) external {
            require(registerGModel[_name],"Model not found");
            uint Cversion=gVersion[_name];
            uint ModelId=modelId[_name];
            GModel[ModelId][Cversion].name=_name;
            GModel[ModelId][Cversion].ipfsHash=_ipfsHash;
            GModel[ModelId][Cversion].jsonHash=_jsonHash;
            GModel[ModelId][Cversion].accuracy=_accuracy;
            GModel[ModelId][Cversion].modelsCombined=_modelsCombined;
            gVersion[_name]+=1;
    }
    
     function getModels() external view returns(GlobalModel[] memory){
        return globalModels;
    }   

    function getGlobalModelIpfs(string memory _name,uint _version) external view returns(string memory){
        uint id = modelId[_name];
        return GModel[id][_version].ipfsHash;
    }

    function getGlobalModelJson(string memory _name,uint _version) external view returns(string memory){
        uint id = modelId[_name];
        return GModel[id][_version].jsonHash;
    }

    function getGlobalModelInfo(string memory _name, uint _version) external view returns (
        string memory,uint,uint,uint )
        {
            uint id = modelId[_name];
            return(
                globalModel[id][ver].name,
                globalModel[id][ver].accuracy,
                globalModel[id][ver].modelsCombined,
                globalModel[id][ver].version
            );
        }

}