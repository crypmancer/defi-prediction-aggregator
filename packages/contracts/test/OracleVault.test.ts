import { expect } from "chai";
import { ethers } from "hardhat";
import { OracleVault, MockERC20 } from "../typechain-types";

describe("OracleVault", function () {
  let vault: OracleVault;
  let token: MockERC20;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy mock token
    const MockERC20Factory = await ethers.getContractFactory("MockERC20");
    token = await MockERC20Factory.deploy(
      "Test Token",
      "TEST",
      ethers.parseEther("1000000")
    );

    // Deploy vault
    const VaultFactory = await ethers.getContractFactory("OracleVault");
    vault = await VaultFactory.deploy(
      await token.getAddress(),
      200, // 2% performance fee
      100, // 1% management fee
      ethers.parseEther("10"), // min deposit
      ethers.parseEther("1000000") // vault cap
    );

    // Give users some tokens
    await token.transfer(user1.address, ethers.parseEther("10000"));
    await token.transfer(user2.address, ethers.parseEther("10000"));
  });

  describe("Deposit", function () {
    it("Should allow deposit", async function () {
      const depositAmount = ethers.parseEther("100");
      await token.connect(user1).approve(await vault.getAddress(), depositAmount);
      
      await expect(vault.connect(user1).deposit(depositAmount))
        .to.emit(vault, "Deposited")
        .withArgs(user1.address, depositAmount, depositAmount);

      expect(await vault.shares(user1.address)).to.equal(depositAmount);
      expect(await vault.totalAssets()).to.equal(depositAmount);
    });

    it("Should reject deposit below minimum", async function () {
      const depositAmount = ethers.parseEther("5");
      await token.connect(user1).approve(await vault.getAddress(), depositAmount);
      
      await expect(vault.connect(user1).deposit(depositAmount))
        .to.be.revertedWith("Amount below minimum");
    });

    it("Should calculate shares correctly for multiple deposits", async function () {
      const deposit1 = ethers.parseEther("100");
      await token.connect(user1).approve(await vault.getAddress(), deposit1);
      await vault.connect(user1).deposit(deposit1);

      const deposit2 = ethers.parseEther("100");
      await token.connect(user2).approve(await vault.getAddress(), deposit2);
      await vault.connect(user2).deposit(deposit2);

      expect(await vault.totalAssets()).to.equal(ethers.parseEther("200"));
      expect(await vault.totalShares()).to.equal(ethers.parseEther("200"));
    });
  });

  describe("Withdraw", function () {
    it("Should allow withdrawal", async function () {
      const depositAmount = ethers.parseEther("100");
      await token.connect(user1).approve(await vault.getAddress(), depositAmount);
      await vault.connect(user1).deposit(depositAmount);

      const shares = await vault.shares(user1.address);
      await expect(vault.connect(user1).withdraw(shares))
        .to.emit(vault, "Withdrawn");

      expect(await vault.shares(user1.address)).to.equal(0);
    });

    it("Should reject withdrawal with insufficient shares", async function () {
      await expect(vault.connect(user1).withdraw(ethers.parseEther("1")))
        .to.be.revertedWith("Insufficient shares");
    });
  });

  describe("Pause", function () {
    it("Should allow owner to pause", async function () {
      await vault.pause();
      expect(await vault.paused()).to.be.true;
    });

    it("Should prevent deposits when paused", async function () {
      await vault.pause();
      const depositAmount = ethers.parseEther("100");
      await token.connect(user1).approve(await vault.getAddress(), depositAmount);
      
      await expect(vault.connect(user1).deposit(depositAmount))
        .to.be.revertedWithCustomError(vault, "EnforcedPause");
    });
  });
});
