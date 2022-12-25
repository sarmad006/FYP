pragma solidity ^0.8.13;
import "./model.sol";
import "./Doctor.sol"
contract hospital{

    bytes32 Name;
    bytes32 Country;
    bytes32 City;
    address MetaMaskAddress;
    bytes32 Departments;
    Doctors Doctors;
    bytes32 Email;
    Model obj;
    bool public newVal;

    mapping((bytes32)=>Doctor) private DoctorPerHospital;

    function getDoctor(bytes32 tempDoctor) public view returns(Doctor)
    {
        return DoctorPerHospital(tempDoctor);
    }

    constructor()
    {
        obj = Model(0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99);
    }
    function setAggregation(bool val) public{
        obj.setAggregation(val);
        
    }

    function getAggregation() public view returns(bool){
       return obj.getAggregation();
    }
    
}