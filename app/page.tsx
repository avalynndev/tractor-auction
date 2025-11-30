import HomePageClient from "./homepage-client";
import { getHomeData } from "@/actions/homeData";

export default async function HomePage() {
  const data = await getHomeData();

  return <HomePageClient data={data} />;
}
