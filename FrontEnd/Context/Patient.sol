pragma solidity ^0.8.13;

contract Patient{

    struct basicInformation{
        bytes32 firstname;
        bytes32 lastname;
        bytes32 age;
        bytes32 gender;
        bytes32 Doctor_name; 
    }

    struct conditionalInformation{
        bytes32 blood_pressure;
        bytes32 age;
        bytes32 oxygen_level;
        bytes32 Blood_Platellete;
        bytes32 Weight Diabetic;
        bytes32 Cholestrole;
        bytes32 Hemoglobin;
        bytes32 Pulse_Count;
    }
}