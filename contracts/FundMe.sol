// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

// 1. 创建一个收款函数
// 2. 记录投资人和存款额
// 3。在锁定期内，达到目标值，生产商可以提款
// 4. 如果没有达到目标值，就记录存款额度，让合约再次进行调用


contract FundMe {
    mapping(address => uint256) public funderAmount;

    // 相当于1美元，后面的是价格精度的概念（由于solidity中不能用小数表示）
    uint256 constant MINIUM_VALUE = 100 * 10 **18;
    // uint256 constant MINIUM_VALUE = 1 **16;

    AggregatorV3Interface internal dataFeed;
    // 美元计价 1000美元
    uint256 constant TARGET_AMOUNNT = 1000 * 10 ** 18;

    address public owner;

    uint256 deploymentTimestamp;

    uint256 blockTime;

    address public erc20Address;

    bool public getFundSuccess = false;

    event fundWithdrawByOwner(uint256);

    // 构造函数，只在合约部署的时候启动一次
    constructor(uint256 _blockTime, address dataFeedAddr) payable {
        dataFeed = AggregatorV3Interface(
            dataFeedAddr
        );
        owner = msg.sender;
        deploymentTimestamp = block.timestamp;
        blockTime = _blockTime;
    }

    // 存钱函数
    function fund() external payable  {
        int price = getChainLinkDataFeedLatestAnswer();
        uint256 amountInUSD = convertETHToUSD(msg.value, price);
        
        require(block.timestamp < deploymentTimestamp + blockTime, "Expired!");

        require(amountInUSD > MINIUM_VALUE, "Fund Amount Must be Greater Than 1 USD!");

        if (funderAmount[msg.sender] > 0) {
            funderAmount[msg.sender] += msg.value;
        } else {
            funderAmount[msg.sender] = msg.value;
        }
        // funderAmount[msg.sender] = msg.value;
    }

    // function getChianLinkDataFeedLatestAnswer() public view returns(int) {
    //     (
    //         /* uint80 roundID */,
    //         int answer,
    //         /* uint starteAt */,
    //         /* uint timeStamp */,
    //         /* uint80 answeredInRound */
    //     ) = dataFeed.latestRoundData();
    //     return answer;
    // }
    //     function getChainlinkDataFeedLatestAnswer() public view returns (int) {
    //     // prettier-ignore
    //     (
    //         /* uint80 roundID */,
    //         int answer,
    //         /*uint startedAt*/,
    //         /*uint timeStamp*/,
    //         /*uint80 answeredInRound*/
    //     ) = dataFeed.latestRoundData();
    //     return answer;
    // }

    // 从chainLink获取价格数据
    function getChainLinkDataFeedLatestAnswer() public view returns(int) {
        // solidity中忽略其他参数的写法
        (,int answer, , ,) = dataFeed.latestRoundData();
        // answer的价格精度是10**8
        return answer;
    }

    // 从chainlink预言机dataFeed priceFeed 获取通证价格数据，然后利用价格数据计算当前fund的美元价值；
    function convertETHToUSD(uint256 valueInETH, int price) internal pure returns(uint256) {
        uint256 newAmount = valueInETH * uint256(price) / (10 ** 8);
        return newAmount;
    }

    // 转移所有权
    function transferOwner(address newOwner) public onlyOwner{
        // require(msg.sender == owner, "Only owner can transfer owner right!");
        owner = newOwner;
    }

    //提款 (生产商)
    function getFund() external winowClosed onlyOwner{
        // require(block.timestamp > deploymentTimestamp + blockTime, "Time is not reached");
        // 从chainlink data feed 获取ETH的价格数据（精度：10**8）
        int price = getChainLinkDataFeedLatestAnswer();
        uint256 balance = address(this).balance;
        // 将当前合约的balance 转换成USD计价的单位，精度10**18
        uint256 balanceInUSD = convertETHToUSD(balance, price);
        // 提款的限制条件
        require(balanceInUSD >= TARGET_AMOUNNT, "Fund Amount Must Be Greater Than 1000 USD");
        // require(msg.sender == owner, "You must be the onwer!");
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        // bool successStatus = payable(msg.sender).send(address(this).balance);
        require(success, "Tx failed!");
        getFundSuccess = success;
        emit fundWithdrawByOwner(balance);
        // payable (owner).transfer(address(this).balance);
        // return (msg.sender, amountInUSD);
    }

    // 投资人退款
    function refund() external winowClosed{
        // 从chainlink data feed 获取ETH的价格数据（精度：10**8）
        int price = getChainLinkDataFeedLatestAnswer();
        // 将当前合约的balance 转换成USD计价的单位，精度10**18
        uint256 balanceInUSD = convertETHToUSD(address(this).balance, price);
        // 当前合约的美元计价的价值储备小于目标价值储备（美元计价）
        require(balanceInUSD < TARGET_AMOUNNT, "Target is reached");
        require(funderAmount[msg.sender] > 0, "You no fund any more!");
        (bool success, ) = payable(msg.sender).call{value: funderAmount[msg.sender]}("");
        require(success, "Tx failed!");
        // 重置用户的余额数据
        funderAmount[msg.sender] = 0;
    }

    // 修饰符
    modifier winowClosed() {
        require(block.timestamp > deploymentTimestamp + blockTime, "Time is not reached!");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can transfer owner right!");
        _;
    }

    function setERC20Addr(address erc20Addr) public onlyOwner{
        erc20Address = erc20Addr;
    }
    

    function setFunderAmount(address addr, uint256 value) external {
        require(msg.sender == erc20Address, "caller must be tartget ERC20 address!");
        funderAmount[addr] = value;
    }

    // modifier moneyGreaterLimit(uint256 amountInUSD, uint256 MINIUM_VALUE) {
    //     require(amountInUSD > MINIUM_VALUE, "Fund Amount Must be Greater Than 1 USD!");
    // }
}