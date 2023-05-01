// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dedoc is ERC20{
    address payable public owner;

    constructor() ERC20("Dedoc", "DOC") {
        owner = payable(msg.sender);
        mint(owner,700000 * (10 ** decimals()));
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    //Token Address : 0x6AF1D20A968eFaED25Ed9616B5ECaeB5D93af0ac    
}
