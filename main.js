import playwright from "playwright";
import retry from "async-retry";
async function test() {
  const browser = await playwright.chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://playwright.dev/docs/intro#installing-playwright", {
    timeout: 2 * 60 * 1000,
  });
  try {
    await page.screenshot({path:"page.png",fullPage:true})
  } catch (error) {
    await page.screenshot({path:"page.png",fullPage:true})
    console.log("error")
  } finally {
    await browser.close();
  }
}

await retry(test, {
  retries: 3,
  onRetry: (err) => console.log("retryiing...", err),
});
