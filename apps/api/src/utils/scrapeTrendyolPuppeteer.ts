import puppeteer from "puppeteer";

export async function scrapeTrendyolReviews(productUrl: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(productUrl, { waitUntil: "networkidle2", timeout: 60000 });

  while (true) {
    try {
      await page.waitForSelector(".review-feed__show-more", { timeout: 3000 });
      await page.click(".review-feed__show-more");
      await new Promise(res => setTimeout(res, 1500)); // Yeni yorumlar gelsin diye küçük bekleme
    } catch {
      break;
    }
  }

  const reviews = await page.evaluate(() => {
    const richReviews = Array.from(document.querySelectorAll(".review-card")).map(card => {
      const username = card.querySelector(".user-name")?.textContent?.trim() || "";
      const rating = Number(card.querySelector(".star")?.getAttribute("data-rating")) || null;
      const content = card.querySelector(".review-text")?.textContent?.trim() || "";
      const date = card.querySelector(".review-date")?.textContent?.trim() || "";
      return { username, rating, content, date };
    });

    if (richReviews.length > 0) {
      return richReviews;
    }

    const simpleReviews = document.querySelectorAll(".reviews .comment .comment-text p");
    if (simpleReviews.length > 0) {
      return Array.from(simpleReviews).map(node => ({
        username: "",
        rating: null,
        content: node.textContent?.trim() || "",
        date: "",
      }));
    }    return [];
  });

  await browser.close();
  return reviews;
}
