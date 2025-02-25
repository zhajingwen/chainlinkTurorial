// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { FundMe } from "./FundMe.sol";

// Fundme
// 1. 让FundMe的参与者，基于mapping来领取对应数量的通证
// 2. 让fundMe的参与者 transfer 通证
// 3. 在使用完成后需要 burn 通证


contract FundTokenERC20 is ERC20 {
    FundMe fundMe;


    constructor(address fundMeAddr) ERC20("Fund", "FNTD") {
        fundMe = FundMe(fundMeAddr);
    }

    function mint(uint256 funderAmountToToken) public {
        // if (account == address(0)) {
        //     revert ERC20InvalidReceiver(address(0));
        // }
        require(fundMe.funderAmount(msg.sender) > funderAmountToToken, "No enough Amount to mint Token!");
        require(fundMe.getFundSuccess(), "FundMe is not completed now");
        _mint(msg.sender, funderAmountToToken);
        uint256 amoutUpdate = fundMe.funderAmount(msg.sender) - funderAmountToToken;
        fundMe.setFunderAmount(msg.sender, amoutUpdate);
        // _update(address(0), account, value);
    }

        function claim(address account, uint256 value) public {
        // if (account == address(0)) {
        //     revert ERC20InvalidSender(address(0));
        // }
        // _update(account, address(0), value);
        require(fundMe.getFundSuccess(), "FundMe is not completed now");
        require(balanceOf(account) >= value, "You don't have enough ERC20 tokens to claim");
        /* to do */
        _burn(account, value);
        // FundMe.
    }
}


