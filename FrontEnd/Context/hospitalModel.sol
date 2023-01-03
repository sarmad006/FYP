pragma solidity ^0.8.13;
import "./Model.sol";
import "./Doctor.sol";
import "./Receptionist.sol";

contract hospital {
Model public modelHospital; 
Doctor public doctorHospital;
Receptionist public ReceptionistHospital; 
bool public hospitalModelAggregation;
mapping(string => Model) public ModelsOfHospital;
mapping(string=> Doctor) public DoctorsOfHospital;
struct modelData{
   string disease;
   uint8  accuracy;
   uint8  epoch;
   uint8  testData;
   uint8  trainData;
   bool  aggregation;
} 
modelData public userModel;

function setModel(string memory disease_name) public{
modelHospital=new Model(disease_name);
ModelsOfHospital[disease_name]=modelHospital;
}
function getModel(string memory disease_name) public{
  Model getModelHospital=ModelsOfHospital[disease_name];
  userModel.disease=getModelHospital.getDiseaseName();
}
function setDoctor(string memory doctor_name,string memory _specialist) public{
doctorHospital=new Doctor(doctor_name,_specialist);
DoctorsOfHospital[doctor_name]=doctorHospital;
}
function setReceptionist(string memory _name) public{
ReceptionistHospital=new Receptionist(_name);
}
function getAggregation() public{
  modelHospital.setAggregation(true);
  hospitalModelAggregation=modelHospital.aggregation();
}

//  function setobject() public returns(string memory){
//    Model obj=new Model();
//    obj.setAggregation(true);
//    return obj.aggregation;
//  }

}