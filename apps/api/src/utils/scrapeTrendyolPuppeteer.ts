import puppeteer from "puppeteer";

export async function scrapeTrendyolReviewsWithPuppeteer(productUrl: string) {
  // 1. Headless browser başlat
  const browser = await puppeteer.launch({ headless: true }); // "new" yerine true

  const page = await browser.newPage();

  // 2. Ürün sayfasına git
  await page.goto(productUrl, { waitUntil: "networkidle2", timeout: 60000 });

  // 3. Daha fazla yorum yükle (ör: 2 defa "Daha fazla göster" tıkla)
  for (let i = 0; i < 2; i++) {
    try {
      await page.waitForSelector(".review-feed__show-more", { timeout: 3000 });
      await page.click(".review-feed__show-more");
      // await page.waitForTimeout(2000);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Fallback
    } catch {
      break;
    }
  }

  // 4. DOM'dan yorumları topla
  const reviews = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".review-card")).map(card => {
      const username = card.querySelector(".user-name")?.textContent?.trim() || "";
      const rating = Number(card.querySelector(".star")?.getAttribute("data-rating")) || null;
      const content = card.querySelector(".review-text")?.textContent?.trim() || "";
      const date = card.querySelector(".review-date")?.textContent?.trim() || "";
      return { username, rating, content, date };
    });
  });

  await browser.close();
  return reviews;
}
