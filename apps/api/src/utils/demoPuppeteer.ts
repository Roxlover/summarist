import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto("https://www.trendyol.com/skechers/ridge-oak-gateway-trail-kadin-gri-outdoor-ayakkabi-180233-gypk-p-926317264/yorumlar", { waitUntil: "networkidle2" });

  await page.waitForSelector(".reviews .comment", { timeout: 10000 });

  const reviews = await page.evaluate(() => {
    const reviewNodes = document.querySelectorAll(".reviews .comment .comment-text p");
    return Array.from(reviewNodes).map(node => node.textContent?.trim() || "");
  });

  console.log("Çekilen yorumlar:", reviews);
  console.log("Toplam yorum:", reviews.length);

  await browser.close();
})();
