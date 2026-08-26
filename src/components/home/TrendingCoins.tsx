import { fetcher } from "@/lib/coingecko.actions";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DataTable from "../DataTable";

export const TrendingCoinsFallback = () => {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <div className="py-2">
          {/* Header row */}
          <div className="grid grid-cols-3 gap-4 px-4 py-4 border-b bg-dark-400">
            <div className="font-medium text-purple-100 text-sm">Name</div>
            <div className="font-medium text-purple-100 text-sm">24h Change</div>
            <div className="font-medium text-purple-100 text-sm">Price</div>
          </div>

          {/* Skeleton rows */}
          {skeletonItems.map((index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 px-2 py-3 border-b border-dark-400/50 last:border-0 items-center"
            >
              {/* Name cell */}
              <div className="name-cell">
                <div className="name-link">
                  <div className="name-image skeleton" />
                  <div className="name-line skeleton" />
                </div>
              </div>

              {/* Change cell */}
              <div className="change-cell">
                <div className="price-change">
                  <div className="change-icon skeleton" />
                  <div className="change-line skeleton" />
                </div>
              </div>

              {/* Price cell */}
              <div className="price-cell">
                <div className="price-line skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "search/trending",
    undefined,
    300,
  );

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link href={`/coins/${item.id}`} className="flex gap-2 p-2">
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500",
            )}
          >
            <p>
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
              {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
            </p>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "Price-cell",
      cell: (coin) => `$${coin.item.data.price.toLocaleString()}`,
    },
  ];
  return (
    <div id="trending-coins">
      <h4 className="py-4">Trending Coins</h4>
      <DataTable
        data={trendingCoins.coins.slice(0, 6) || ""}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
      />
    </div>
  );
};

export default TrendingCoins;
