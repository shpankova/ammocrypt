import test from '../lib/baseTest';
import { LoginPage } from "@pages/loginPage";
import { PurchasePage } from "@pages/purchasePage";


test ('Connect wallet flow', async ( {page, context} )=> {
  const loginPage = new LoginPage(page);
  await loginPage.login();
  await loginPage.connectWallet();

  await new PurchasePage(page).navigateSelf();
  //comment line below in production mode
  //await page.pause();

})

