pragma solidity ^0.8.13;
import "./patient.sol"
import "./Doctor.sol"

contract Receptionist{
    bytes32 Name;
    patient patientObj;
     
    function patientObjInitilize(address contract_address){
        patientObj = new patient(contract_address);
    }

    function setPatientAttributes(bytes32 temp_firstname,temp_lastname,temp_age,temp_gender,temp_Doctorname)
    {
        patientObj[0].basicInformation.firstname = temp_firstname;
        patientObj.basicInformation.lastname = temp_lastname;
        patientObj.basicInformation.agename = temp_agename;
        patientObj.basicInformation.gendername = temp_gendername;
        patientObj.basicInformation.Doctor_name = temp_Doctorname; 
    }

    function forwardDoctor(){
        
    }
    

}