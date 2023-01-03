pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;


contract Superuser {
    constructor() {
        
    }

    struct Hospital{
        string name;
        string city;
        string email;
        string department;
        uint doctors;
        address metamask;
    }

    Hospital[] public hospitals;
    

    function registerHospital(string memory _name
    ,string memory _city, string memory _email, string memory _department
    ,uint _doctor ,address _metamask) public {
        hospitals.push(
            Hospital({
                name:_name,
                city:_city,
                email:_email,
                department:_department,
                doctors:_doctor,
                metamask:_metamask
            })
        );
    }

    function getHospitals()public view returns(Hospital[] memory){
        return hospitals;
    }
}