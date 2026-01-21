import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy mock ERC20 token for testing
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const mockToken = await MockERC20.deploy("Test Token", "TEST", ethers.parseEther("1000000"));
  await mockToken.waitForDeployment();
  console.log("MockERC20 deployed to:", await mockToken.getAddress());

  // Deploy PredictionAggregator
  const PredictionAggregator = await ethers.getContractFactory("PredictionAggregator");
  const aggregator = await PredictionAggregator.deploy();
  await aggregator.waitForDeployment();
  console.log("PredictionAggregator deployed to:", await aggregator.getAddress());

  // Deploy OracleVault
  const OracleVault = await ethers.getContractFactory("OracleVault");
  const vault = await OracleVault.deploy(
    await mockToken.getAddress(), // depositToken
    200, // performanceFeeBps (2%)
    100, // managementFeeBps (1%)
    ethers.parseEther("10"), // minDeposit
    ethers.parseEther("1000000") // vaultCap
  );
  await vault.waitForDeployment();
  console.log("OracleVault deployed to:", await vault.getAddress());

  // Deploy AutomatedBetting
  const AutomatedBetting = await ethers.getContractFactory("AutomatedBetting");
  const betting = await AutomatedBetting.deploy(await aggregator.getAddress());
  await betting.waitForDeployment();
  console.log("AutomatedBetting deployed to:", await betting.getAddress());

  console.log("\n=== Deployment Summary ===");
  console.log("MockERC20:", await mockToken.getAddress());
  console.log("PredictionAggregator:", await aggregator.getAddress());
  console.log("OracleVault:", await vault.getAddress());
  console.log("AutomatedBetting:", await betting.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
