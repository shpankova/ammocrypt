import test from '../lib/baseTest';

const expect = test.expect;

// ////////////////////////////////////////////
test ('Without wallet connected', async ( {page, context} )=>{
    // await page.routeFromHAR("./har/example.har", {
    //   url : "*/**",
    //   update : true,
    // });

    const StageHomePage = 'https://stage.app.ammocrypt.io';
    await page.goto(StageHomePage);

    const allPages = context.pages();
    // console.log('111111111')
    // console.log(allPages.length)
    // console.log(allPages)


    // await allPages[0].close();
    await allPages[1].bringToFront();


    await expect(page).toHaveURL('https://stage.app.ammocrypt.io');
    await expect(page).toHaveTitle('AmmoCrypt');

    const startForm = page.getByText('Please connect your wallet to access AmmoCrypt');
    await expect(startForm).toBeVisible();

    const purchaseTab = page.locator("//a[normalize-space()='Purchase']");
    await expect(purchaseTab).toBeVisible();

    const transHistoryTab = page.getByText('Transaction history');
    await expect(transHistoryTab).toBeVisible();

    const balanceTab = page.getByRole('link', {name: 'Balance'});
    await expect(balanceTab).toBeVisible();

    await (purchaseTab).click();

    const connectWalletButton = '//button[contains(@class, "1l3353z")]';
    await expect(page.locator(connectWalletButton)).toBeEnabled();

    const purchasePageTitle = '//h1[contains(@class, "1vdj0k1")]';
    const purchasePageTitleText = await page.locator(purchasePageTitle).textContent()
    expect(purchasePageTitleText).toEqual('Purchase');

    const connectWalletButton2 = '//button[contains(@class, "1l3353z")]';
    await (transHistoryTab).click();
    await expect(startForm).toBeVisible();
    await expect(page.locator(connectWalletButton2)).toBeEnabled();

    await allPages[1].bringToFront();
    await allPages[0].close();
    await page.waitForLoadState();
    await page.waitForTimeout(5000);
    await allPages[2].bringToFront();

    const agreeCheckBox = '[for="onboarding__terms-checkbox"]';
    await allPages[2].locator(agreeCheckBox).click();

    const importWalletButton = '[data-testid="onboarding-import-wallet"]';
    await allPages[2].locator(importWalletButton).click();

    const iAgreeMessage = '[data-testid="onboarding-metametrics"]';
    expect(allPages[2].locator(iAgreeMessage)).toBeVisible;

    const iAgreeButton= '[data-testid="metametrics-i-agree"]';
    await allPages[2].locator(iAgreeButton).click();

    const seedFraseForm = '[data-testid="import-srp"]';
    expect(allPages[2].locator(seedFraseForm)).toBeVisible;

    const seedWordsOwner1 = ['rubber', 'project', 'fluid', 'zoo', 'clog', 'nuclear', 'vibrant', 'six', 'refuse', 'say', 'couple', 'large'];

    for (let i = 1; i <= 12; i++) {
      const inputSeedLocator = `[data-testid="import-srp__srp-word-${i-1}"]`;
      await allPages[2].fill(inputSeedLocator, seedWordsOwner1[i - 1]);
      const filledValue = await allPages[2].locator(inputSeedLocator).inputValue();
      expect(filledValue).toBe(seedWordsOwner1[i - 1]);
    }
    const seedsConfirmButton = '[data-testid="import-srp-confirm"]';
    await expect(allPages[2].locator(seedsConfirmButton)).toBeEnabled;
    await allPages[2].locator(seedsConfirmButton).click();

    const createPassForm = '[data-testid="create-password"]';
    await expect(allPages[2].locator(createPassForm)).toBeVisible;

    const metaMaskPassword = 'suHGals126!';
    const newPassInput = '[data-testid="create-password-new"]';
    const newPassInputConfirm = '[data-testid="create-password-confirm"]';
    await allPages[2].fill(newPassInput, metaMaskPassword);
    await allPages[2].fill(newPassInputConfirm, metaMaskPassword);

    const rulesConfirmCheckBox = '[type="checkbox"]';
    await allPages[2].click(rulesConfirmCheckBox);

    const importWalletBtn = '[data-testid="create-password-import"]';
    expect(allPages[2].locator(importWalletBtn)).toBeEnabled;
    await allPages[2].locator(importWalletBtn).click();

    const walletCreatedNotificationWindow = '[data-testid="creation-successful"]';
    expect(allPages[2].locator(walletCreatedNotificationWindow)).toBeVisible;

    const gotItBtn = '[data-testid="onboarding-complete-done"]';
    await expect(allPages[2].locator(gotItBtn)).toBeEnabled;
    await allPages[2].locator(gotItBtn).click();

    const installCompleteWindow = '[data-testid="onboarding-pin-extension"]';
    await expect(allPages[2].locator(installCompleteWindow)).toBeVisible;
    const nextBtn = '[data-testid="pin-extension-next"]';
    await allPages[2].locator(nextBtn).click();
    const doneBtn = '[data-testid="pin-extension-done"]';
    await allPages[2].locator(doneBtn).click();

    if (allPages[2].locator('[data-testid="popover-close"]').waitFor({ state: 'visible' })) {
    await allPages[2].locator('[data-testid="popover-close"]').click();
    }

    const blockchainTypeSelector = '[data-testid="network-display"]';

    if (allPages[2].locator(blockchainTypeSelector).textContent.toString() !== 'Goerli') {
      await allPages[2].locator(blockchainTypeSelector).click();
      const checkbox = allPages[2].locator('.toggle-button');
      await checkbox.waitFor({ state: 'visible' });
      await checkbox.click();
      const sepoliaNetSelector = '.mm-box--background-color-sepolia'
      await allPages[2].locator(sepoliaNetSelector).click();
      const sepoliaSelector = '//span[contains(text(), "Sepolia")]'
      await allPages[2].waitForSelector(sepoliaSelector);
      expect(await allPages[2].locator(blockchainTypeSelector).textContent()).toContain('Sepolia');
      }
      else {
        expect(await allPages[2].locator('blockchainTypeSelector').textContent()).toContain('Sepolia');
      }

      await allPages[1].bringToFront();
      const connectWalletButtonCorner = '//button[contains(@class, "p03uw3")]';
      await page.locator(connectWalletButtonCorner).click();

      const connectWalletForm = '.outer-container';
      await expect(page.locator(connectWalletForm)).toBeVisible();

      const metaMask = '.st8';
      await page.locator(metaMask).click();


//       const newPagePromise = context.waitForEvent('page');
// newPagePromise.then(async newPage => {
//   // Выполнить какие-либо действия с новым окном
//   const title = await newPage.title();
//   console.log(`Заголовок нового окна: ${title}`);
// });
      // console.log('111111111')
      // console.log(allPages.length)
      // console.log(allPages[0])

            // console.log(await page.title() + '111111111111')
            // console.log(await allPages[1].title() + '333333333333')
            // console.log(await allPages[2].title() + '444444444444')

///////////////////////////////////// working with metamask notification window/////////////////////////////////////
      context.on('page', async page => {
      await page.waitForLoadState('domcontentloaded');
      const title = await page.title();
        if (title === 'MetaMask Notification') {
          const nextForConnectionBtn = '[data-testid="page-container-footer-next"]';
          await page.click(nextForConnectionBtn);
          }
      });

        context.on('page', async page => {
            await page.waitForLoadState();
            // console.log(await page.title() + '111111111111')
            // console.log(await allPages[1].title() + '222222222222')
            // console.log(await allPages[2].title() + '333333333333')
            const signBtn = '[data-testid="page-container-footer-next"]';
            // await page.click(signBtn);
            // await page.waitForLoadState();
            await page.waitForSelector(signBtn);
            await page.click(signBtn, {force: true});
            });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  await page.waitForTimeout(10000);





})

