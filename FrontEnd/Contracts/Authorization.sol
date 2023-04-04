//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "./Hospital.sol";
import "./SuperUser.sol";

contract Authorization{
    
    Authorization authorization;
    Hospital hospital;
    SuperUser superUser;

    constructor(Authorization _authorization,superUser,hospital) {
        authorization = _authorization;
        superUser = _superUser;
        hospital = _hospital
    }

    function login(address _address)public view returns(string memory){
 
        string memory superUserIsExist;
        string memory HospitalIsExist;

        superUserIsExist = superUserLogin(_address);
        if(loginAddress != "NotExist"){
            return superUserIsExist;
        }

        HospitalIsExist = hospitalLogin(_address);
        if(loginAddress != "NotExist"){
            return HospitalIsExist;
        }

        return "Not Exist";   
    }

    function registerHospital(address _address)
    {       
        
    }

    function registerSuperuser(address _address)
    {

    }
}