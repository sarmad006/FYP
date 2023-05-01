//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;


contract Authorization{

        //contract address : 0x8BC492f936374B2e29a19d74A5E54eb4e55eb182
    
        mapping (address => bool) public isSuperUser;
        mapping (address => bool) public isHospital;


    function validateHospital(address _hospitalAddress) public {
        isHospital[_hospitalAddress]=true;
    }

    
    function validateSuperUser(address _superuserAddress) public {
        isSuperUser[_superuserAddress]=true;
    }
        
    
     function authenticate(address _user)external view returns(string memory) {
            if(isSuperUser[_user]){
                return "SuperUser";
            }
            else if(isHospital[_user]){
                return "Hospital";
            }
            else{
                return "Account Doesn't Exists";
            }
        }

}