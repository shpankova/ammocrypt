import test from '../lib/baseTest';
import {expect} from "@playwright/test";

// ////////////////////////////////////////////
test ('History page test', async ( {historyPage, context, profile} )=> {
  await historyPage.page().goto('/');
  await historyPage.navigateSelf();
  // await historyPage.page().pause();
})

