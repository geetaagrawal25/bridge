// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AssetLock is ERC20 {
   
    uint256 private _tokenIds;
    address public owner;
    IERC20 private token;
    
    event assetLocked(uint256 uid, address indexed owner, uint256 amount);

    constructor(string memory name_, string memory symbol_, address tokenAddress) ERC20(name_, symbol_)
    {
       token = IERC20(tokenAddress);
    }

    function erc20Lock(uint256 amount) external {
        
        require(token.balanceOf(msg.sender) > 0, "Not sufficient balance");
        require(token.transferFrom(msg.sender, address(this), amount), "ransfer failed");

        uint256 uid = _tokenIds++;
        emit assetLocked(uid, msg.sender, amount);

    }


}
