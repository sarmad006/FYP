//SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;


contract Authorization{
    
        mapping (address => bool) isSuperUser;
        mapping (address => bool) isHospital;
    
     function Authenticate(address _user)external view returns(string memory) {
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