//const { ethers } = require("ethers");

async function main(){

    const token = await ethers.getContractFactory("Erc20_mint");
    const Token = await token.deploy();

    console.log("Deploy done");
    console.log({
      token: Token.address,
    });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });