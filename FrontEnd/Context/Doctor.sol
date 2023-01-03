pragma solidity ^0.8.13;

contract Doctor{
    string public Name;
    string public Specialist;

    constructor(string memory _name,string memory _specialist){
        Name=_name;
        Specialist=_specialist;
    }

   
}