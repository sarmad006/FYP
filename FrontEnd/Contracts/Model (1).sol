//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;
import "hardhat/console.sol";

contract Model{


    // contract address : 0xC55B7753bAB3e64c72098133850667595Af398B7
    // latest address : 0x1F1A8Dc1583AeA4580323794110a0977d1CD8Da3

    uint public count=0;

    constructor(){

    }

    struct GlobalModel{
        string name;
        string ipfsHash;
        string jsonHash;
        uint modelsCombined;
        uint version;
        uint id;
        uint accuracy;
    
    }

    struct LocalModel{
        address hospital;
        string name;
        string ipfsHash;
        string jsonHash;
        uint accuracy; 
        uint version;
        bool aggregated;
        
    }

    GlobalModel[] public globalModels;

    mapping(uint => mapping(uint => GlobalModel)) public GModel;
    mapping(address => mapping(string => mapping(uint => LocalModel))) public LModel;

    //NEWLY ADDED FEATURE
    mapping(string => uint) public MinAccuracyRequired;

    mapping(string => uint ) public modelId;
    mapping(string => uint) public gVersion;
    mapping(string => bool) public registerGModel;

    mapping (string => mapping(address => bool)) public registerLModel;  //ipfs Qmb4tzUHp5PJT5xyxdJWcaX3gwTTaQZtsLkYBjivXYWXh6
                                                                         // json  QmPU1HoNnrBUWTfLnDzHeA8sbgGr7n2V6SUHpxehrZCTPV
    mapping(string => uint ) public LmodelId;
    mapping(string => mapping(address => uint )) public LVersion;


    function registerModel(string memory _name) public{
       require(!registerGModel[_name],"Already Exists");
       registerGModel[_name]=true;
       gVersion[_name]=0;
    }

    function registerlModel(string memory _name,address _hospitalAddress) private {
        require(!registerLModel[_name][_hospitalAddress],"Already Exists");
        registerLModel[_name][_hospitalAddress]=true;
        LVersion[_name][_hospitalAddress]=0;
    }

    // Global Model Setter Methods

    function addGlobalModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy
       ) public 
       {
           registerModel(_name);
           uint Gversion=gVersion[_name];
           GModel[count][Gversion].name=_name;
           GModel[count][Gversion].ipfsHash=_ipfsHash;
           GModel[count][Gversion].jsonHash=_jsonHash;
           GModel[count][Gversion].modelsCombined=0;
           GModel[count][Gversion].accuracy=0;
           GModel[count][Gversion].id=count;
           GModel[count][Gversion].version=Gversion;
           MinAccuracyRequired[_name]=_accuracy;
           gVersion[_name]++;
           modelId[_name]=count;
           

           globalModels.push(GlobalModel({
               name:_name,
               ipfsHash:_ipfsHash,
               jsonHash:_jsonHash,
               modelsCombined:0,
               id:count,
               version:Gversion,
               accuracy:0

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
            GModel[ModelId][Cversion].modelsCombined=_modelsCombined;
            GModel[ModelId][Cversion].accuracy=_accuracy;
            gVersion[_name]++;
            
    }
    // Local Model Setter Methods
    function addLocalModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy, 
        address _hospitalAddress
    ) external{
        registerlModel(_name,_hospitalAddress);
        uint lversion = LVersion[_name][_hospitalAddress];
        LModel[_hospitalAddress][_name][lversion].name=_name;
        LModel[_hospitalAddress][_name][lversion].ipfsHash=_ipfsHash;
        LModel[_hospitalAddress][_name][lversion].jsonHash=_jsonHash;
        LModel[_hospitalAddress][_name][lversion].accuracy=_accuracy;
        LModel[_hospitalAddress][_name][lversion].hospital=_hospitalAddress;
        LModel[_hospitalAddress][_name][lversion].version=lversion;
        LModel[_hospitalAddress][_name][lversion].aggregated=true;
        LVersion[_name][_hospitalAddress]+=1;
    }

    function updateLocalModel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy,
        address _hospitalAddress
    )external{
        require(registerLModel[_name][_hospitalAddress],"Does not Exist");
        uint cversion=LVersion[_name][_hospitalAddress];
        LModel[_hospitalAddress][_name][cversion].name=_name;
        LModel[_hospitalAddress][_name][cversion].ipfsHash=_ipfsHash;
        LModel[_hospitalAddress][_name][cversion].jsonHash=_jsonHash;
        LModel[_hospitalAddress][_name][cversion].accuracy=_accuracy;
        LModel[_hospitalAddress][_name][cversion].version=cversion;
        LModel[_hospitalAddress][_name][cversion].hospital=_hospitalAddress;
        LVersion[_name][_hospitalAddress]+=1;
    }

    // Getter Methods
    // Global Model

     function getModels() external view returns(GlobalModel[] memory){
        return globalModels;
    }   


    function getGlobalIpfs(string memory _name,uint ver) external view returns(string memory){
        uint id = modelId[_name];
        return GModel[id][ver].ipfsHash;
    }

    function getGlobalJson(string memory _name,uint ver) external view returns(string memory){
        uint id = modelId[_name];
        return GModel[id][ver].jsonHash;
    }


    function getGlobalModelInfo(string memory _name, uint ver) external view returns (
        string memory,
        uint,
        uint,
        uint 
    ){
        uint id = modelId[_name];
        return(
            GModel[id][ver].name,
            MinAccuracyRequired[_name],
            GModel[id][ver].modelsCombined,
            GModel[id][ver].version
        );
    }

    // Getter Methods
    // Local Model
    

    function getLocalIpfs(string memory _name,uint ver,address _hospitalAddress) external view returns(string memory){
        return LModel[_hospitalAddress][_name][ver].ipfsHash;
    }

    function getLocalJson(string memory _name,uint ver,address _hospitalAddress) external view returns(string memory){
        return LModel[_hospitalAddress][_name][ver].jsonHash;
    }

    

    function getLocalModelInfo(string memory _name,uint _version,address _hospitalAddress) external view returns (
        string memory,
        uint,
        uint
    )
    {
  
        return(
            LModel[_hospitalAddress][_name][_version].name,
            LModel[_hospitalAddress][_name][_version].accuracy,
            LModel[_hospitalAddress][_name][_version].version
        );     
    }   

}