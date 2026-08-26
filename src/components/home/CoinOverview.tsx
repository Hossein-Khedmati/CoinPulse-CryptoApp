import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <p className="header-line-sm skeleton" />
          <h1 className="header-line-lg skeleton" />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

const CoinOverview = async () => {
  let coin;
  try {
    coin = await fetcher<CoinDetailsData>("coins/bitcoin", {
      dex_pair_format: "symbol",
    });
  } catch (error) {
    console.error("Error fetching overview coins", error);
    return <CoinOverviewFallback />;
  }
  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  );
};

export default CoinOverview;
