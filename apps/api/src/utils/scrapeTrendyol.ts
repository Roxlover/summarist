import cheerio from "cheerio";

export async function scrapeTrendyolReviews(productUrl: string) {
const productIdMatch = productUrl.match(/-p-(\d+)/);
console.log("productIdMatch:", productIdMatch);
  const productId = productIdMatch ? productIdMatch[1] : null;
  if (!productId) throw new Error("Product ID bulunamadı!");

  const apiUrl = `https://public-mdc.trendyol.com/discovery-web-socialgw-service/api/review/${productId}?storefrontId=1&page=0&size=20&sort=0&language=tr`;
console.log("Fetch ediliyor:", apiUrl);

try {
  const res = await fetch(apiUrl, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });
  if (!res.ok) throw new Error(`Trendyol API hatası: ${res.statusText}`);
  const json = await res.json();

  const reviews = json.result.content.map((review: any) => ({
    productId,
    platformReviewId: review.id,
    username: review.userFullName,
    rating: review.rating,
    content: review.reviewText,
    date: review.createdDate,
  }));
  return reviews;
} catch (err) {
  console.error("Fetch sırasında hata:", err);
  throw err;
}
}
