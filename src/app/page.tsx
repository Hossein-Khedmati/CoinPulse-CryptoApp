import DataTable from "@/components/DataTable";
import Categories, { CategoriesSkeleton } from "@/components/home/Categories";
import CoinOverview, {
  CoinOverviewFallback,
} from "@/components/home/CoinOverview";
import TrendingCoins, {
  TrendingCoinsFallback,
} from "@/components/home/TrendingCoins";
import { Suspense } from "react";

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
