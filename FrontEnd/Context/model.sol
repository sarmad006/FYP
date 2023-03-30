//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

contract Model{


    // contract address : 0xC55B7753bAB3e64c72098133850667595Af398B7
    uint public count=0;

    constructor(){

    }

    struct GlobalModel{
        string name;
        string ipfsHash;
        string jsonHash;
        uint accuracy;
        uint modelsCombined;
        uint version;
        uint id;
    
    }

    struct LocalModel{
        address hospital;
        string name;
        string ipfsHash;
        string jsonHash;
        uint accuracy; 
        uint version;
        
    }

    GlobalModel[] public globalModels;

    mapping(uint => mapping(uint => GlobalModel)) public GModel;
    mapping(address => mapping(string => mapping(uint => LocalModel))) public LModel;

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

    function registerlModel(string memory _name) private {
        require(!registerLModel[_name][msg.sender],"Already Exists");
        registerLModel[_name][msg.sender]=true;
        LVersion[_name][msg.sender]=0;
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

    function aggregateGModel(
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
    // Local Model Setter Methods
    function addLmodel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy 
    ) external{
        registerlModel(_name);
        uint lversion = LVersion[_name][msg.sender];
        LModel[msg.sender][_name][lversion].name=_name;
        LModel[msg.sender][_name][lversion].ipfsHash=_ipfsHash;
        LModel[msg.sender][_name][lversion].jsonHash=_jsonHash;
        LModel[msg.sender][_name][lversion].accuracy=_accuracy;
        LModel[msg.sender][_name][lversion].hospital=msg.sender;
        LModel[msg.sender][_name][lversion].version=lversion;
        LVersion[_name][msg.sender]+=1;
    }

    function updateLmodel(
        string memory _name,
        string memory _ipfsHash,
        string memory _jsonHash,
        uint _accuracy
    )external{
        require(registerLModel[_name][msg.sender],"Does not Exist");
        uint cversion=LVersion[_name][msg.sender];
        LModel[msg.sender][_name][cversion].name=_name;
        LModel[msg.sender][_name][cversion].ipfsHash=_ipfsHash;
        LModel[msg.sender][_name][cversion].jsonHash=_jsonHash;
        LModel[msg.sender][_name][cversion].accuracy=_accuracy;
        LModel[msg.sender][_name][cversion].version=cversion;
        LModel[msg.sender][_name][cversion].hospital=msg.sender;
        LVersion[_name][msg.sender]+=1;
    }

    // Getter Methods
    // Global Model

     function getModels() external view returns(GlobalModel[] memory){
        return globalModels;
    }   

    function getGIpfs(string memory _name) external view returns(string memory){
        uint id = modelId[_name];
        uint v = gVersion[_name]-1;
        return GModel[id][v].ipfsHash;
    }

    function getGJson(string memory _name) external view returns(string memory){
        uint id = modelId[_name];
        uint v = gVersion[_name]-1;
        return GModel[id][v].jsonHash;
    }

    function getCustomGIpfs(string memory _name,uint ver) external view returns(string memory){
        uint id = modelId[_name];
        return GModel[id][ver].ipfsHash;
    }

    function getCustomGJson(string memory _name,uint ver) external view returns(string memory){
        uint id = modelId[_name];
        return GModel[id][ver].jsonHash;
    }

    function getLatestGModelInfo(string memory _name) external view returns (
        string memory,
        uint,
        uint,
        uint 
    ){
        uint v = gVersion[_name]-1;
        uint id = modelId[_name];
        return(
            GModel[id][v].name,
            GModel[id][v].accuracy,
            GModel[id][v].modelsCombined,
            GModel[id][v].version
        );
    }

    function getCustomGModelInfo(string memory _name, uint ver) external view returns (
        string memory,
        uint,
        uint,
        uint 
    ){
        uint id = modelId[_name];
        return(
            GModel[id][ver].name,
            GModel[id][ver].accuracy,
            GModel[id][ver].modelsCombined,
            GModel[id][ver].version
        );
    }

    // Getter Methods
    // Local Model
    function getLIpfs(string memory _name) external view returns(string memory){
        
        uint v =LVersion[_name][msg.sender] - 1;
        return LModel[msg.sender][_name][v].ipfsHash;
    }

    function getLJson(string memory _name) external view returns(string memory){
        uint v =LVersion[_name][msg.sender] - 1;
        return LModel[msg.sender][_name][v].jsonHash;
    }

    function getCustomLIpfs(string memory _name,uint ver) external view returns(string memory){
        return LModel[msg.sender][_name][ver].ipfsHash;
    }

    function getCustomLJson(string memory _name,uint ver) external view returns(string memory){
        return LModel[msg.sender][_name][ver].jsonHash;
    }

    function getLatestLModelInfo(string memory _name) external view returns (
        string memory,
        uint,
        uint
    )
    {
        uint v =LVersion[_name][msg.sender] - 1;   
        return(
            LModel[msg.sender][_name][v].name,
            LModel[msg.sender][_name][v].accuracy,
            LModel[msg.sender][_name][v].version
        );     
    }

    function getCustomLModelInfo(string memory _name,uint _version) external view returns (
        string memory,
        uint,
        uint
    )
    {
  
        return(
            LModel[msg.sender][_name][_version].name,
            LModel[msg.sender][_name][_version].accuracy,
            LModel[msg.sender][_name][_version].version
        );     
    }   

}