pragma solidity ^0.8.13;
contract Model{
    
   string public disease;
   uint8 public accuracy;
   uint8 public epoch;
   uint8 public testData;
   uint8 public trainData;
   bool  public aggregation;
 
  constructor(string memory Name) {
   disease=Name;
  }

  function setResults(uint8 modelAccuracy,uint8 modelEpoch,uint8 modeltestData,uint8 modeltrainData) public {
    accuracy=modelAccuracy;
    epoch=modelEpoch;
    testData=modeltestData;
    trainData=modeltrainData;
  }

  function setAggregation(bool modelAggregation) public{
      aggregation=modelAggregation;
  }
  function getAggregation() public view returns(bool){
    return aggregation;
  }
  function getDiseaseName() public view returns(string memory){
    return disease;
  }

}