import test from '../lib/baseTest';
import {expect} from "@playwright/test";
import {MetaMaskConnectWalletPage} from "@pages/metaMaskConnectWalletPage";
import {MetaMaskSpendingCapPage} from "@pages/metaMaskSpendingCapPage";
import {MetaMaskConfirmPage} from "@pages/metaMaskConfirmPage";
import {LoginPage} from "@pages/loginPage";

test ('Purchase transaction flow', async ( {purchasePage, context} )=> {
  const loginPage = new LoginPage(purchasePage.page());
  await loginPage.login();
  await loginPage.connectWallet();

  await purchasePage.navigateSelf();
  await purchasePage.PAYMENT_TOKEN.selectToken('USDC')
  await purchasePage.PURCHASED_TOKEN.selectToken('ANDR2');
  await expect(purchasePage.CURRENCY_RATE).toContainText('ANDR2');
  await purchasePage.PURCHASED_TOKEN.setAmount('1');
  //comment line below in production mode
  // await purchasePage.page().pause();

  await expect(purchasePage.AUTHORISE_BUTTON).toHaveText('Authorize purchase', {timeout:30000});
  await purchasePage.AUTHORISE_BUTTON.click();

  let newPage = await context.waitForEvent('page');
  console.log(await newPage.title() + ' - Approve');

  const metaMaskSpendingCapPage = new MetaMaskSpendingCapPage(newPage);
  await metaMaskSpendingCapPage.NEXT_BUTTON.click();
  await metaMaskSpendingCapPage.APPROVE_BUTTON.click();
  expect(metaMaskSpendingCapPage.page().isClosed());

  newPage = await context.waitForEvent('page', {timeout: 60000});
  console.log(await newPage.title() + ' - Confirm');
  //comment line below in production mode
  // await purchasePage.page().pause();

  const metaMaskConfirmPage = new MetaMaskConfirmPage(newPage);
  await metaMaskConfirmPage.CONFIRM_BUTTON.click();

})

