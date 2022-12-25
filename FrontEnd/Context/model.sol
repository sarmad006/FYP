pragma solidity ^0.8.13;
contract Model{
    
   bytes32 public disease;
   uint8 public accuracy;
   uint8 public epoch;
   uint8 public testData;
   uint8 public trainData;
   bool public aggregation;
 

constructor() public payable{
    
}

  function setResults(uint8 tempAccuracy,uint8 tempEpoch,uint8 temptestData,uint8 tmeptrainData) public {
    accuracy=tempAccuracy;
    epoch=tempEpoch;
    testData=temptestData;
    trainData=temptrainData;
  }

  function setAggregation(bool tempAggregation) public{
      aggregation=Aggregation;
  }

  function getAggregation() public view returns(bool){
      return aggregation;
  }

  function setdisease(bytes32 temp_disease){
      disease = temp_disease;
  }
}