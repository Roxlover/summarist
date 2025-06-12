import puppeteer from "puppeteer";

export default async function scrapeHepsiburadaReviews(productUrl: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(productUrl, { waitUntil: "networkidle2", timeout: 60000 });

  for (let i = 0; i < 5; i++) {
    try {
      await page.waitForSelector(".hermes-ReviewCard-module-continueButton", { timeout: 4000 });
      await page.click(".hermes-ReviewCard-module-continueButton");
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch {
      break;
    }
  }

  const reviews = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".hermes-ReviewCard-module-reviewCard"))
      .map(card => {
        const username = card.querySelector(".hermes-UserInfo-module-userName")?.textContent?.trim() || "";
        const ratingStr = card.querySelector(".hermes-RatingStars-module-stars")?.getAttribute("aria-label") || "";
        const rating = ratingStr ? Number(ratingStr.match(/\d+/)?.[0]) : null;
        const content = card.querySelector(".hermes-ReviewCard-module-text")?.textContent?.trim() || "";
        const date = card.querySelector(".hermes-ReviewCard-module-date")?.textContent?.trim() || "";
        return { username, rating, content, date };
      });
  });

  await browser.close();
  return reviews;
}
