import pw from "playwright";
import Config from "./types/Config";
import { generateOutput } from "./utils";

export default class Crawler {
  private count = 0;

  constructor(public config: Config) {
    this.config = config;
  }

  public async crawl() {
    const { maxPages, selectors, url } = this.config;
    const browser = await pw.chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    /**
     * the evaluate function runs inside the browser so configurations are not present their by default
     * so we are passing url as the argument so that it can be used
     */
    const links = await page.evaluate((url) => {
      return Array.from(document.querySelectorAll("a"))
        .map((a) => a.href)
        .filter((href) => href?.startsWith(url));
    }, url);

    // we cant use async callback inside foreach loop
    for (const link of links) {
      try {
        await page.goto(link);
        const title = await page.title();
        const body = await page.$("body");
        const bodyContent = await body?.textContent();

        const code = await body?.$("code");
        const codeContent = await code?.textContent();

        await generateOutput({
          body: bodyContent || "",
          title: title,
          code: codeContent || "",
        });
      } catch (error) {
        console.log(error);
      }
    }

    await browser.close(); // Don't forget to close the browser when done.
  }
}
