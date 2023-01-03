const hre = require("hardhat");

async function main(){
    const getSuperUserABI = await hre.ethers.getContractFactory("superUser");
    const superUserDeploy = await getSuperUserABI.deploy();
    
    await superUserDeploy.deployed();
    console.log("Super User succesfully deployed", superUserDeploy.address);
}
//0x850b6847086159d5d9031cD9ee41e4872557ef47 Contract Address saved
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
