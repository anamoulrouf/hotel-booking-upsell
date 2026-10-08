// robots.txt (H36): private reports and APIs stay out of search engines.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: ["/report/", "/api/"] }],
  };
}
