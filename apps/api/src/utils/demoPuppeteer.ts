import { scrapeTrendyolReviewsWithPuppeteer } from "./scrapeTrendyolPuppeteer";

const url = "https://www.trendyol.com/skechers/ridge-oak-gateway-trail-kadin-gri-outdoor-ayakkabi-180233-gypk-p-926317264/yorumlar";

scrapeTrendyolReviewsWithPuppeteer(url)
  .then(reviews => {
    console.log("Çekilen yorumlar:", reviews);
    console.log(`Toplam yorum: ${reviews.length}`);
  })
  .catch(err => {
    console.error("Hata:", err.message);
  });
