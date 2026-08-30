import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "../DataTable";
import Image from "next/image";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";



export const CategoriesSkeleton = () => {
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

  return (
     <div id="categories-fallback" className="custom-scrollbar pt-4 animate-pulse">
      <h4>Top Categories</h4>
      <table className="mt-3 w-full">
        <thead>
          <tr className="border-b border-dark-400">
            <th className="category-cell text-left">Category</th>
            <th className="top-gainers-cell text-left">Top Gainers</th>
            <th className="change-header-cell text-left">24h Change</th>
            <th className="market-cap-cell text-left">Market Cap</th>
            <th className="volume-cell text-left">24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((i) => (
            <tr key={i} className="border-b border-dark-400/50 last:border-none">
              <td className="category-cell">
                <div className="category-skeleton skeleton rounded" />
              </td>

              <td className="top-gainers-cell">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="coin-skeleton skeleton" />
                ))}
              </td>

              <td className="change-header-cell">
                <div className="change-cell">
                  <div className="value-skeleton-sm skeleton rounded" />
                  <div className="change-icon skeleton" />
                </div>
              </td>

              <td className="market-cap-cell">
                <div className="value-skeleton-lg skeleton rounded" />
              </td>

              <td className="volume-cell">
                <div className="value-skeleton-md skeleton rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



const Categories = async () => {
  const categories = await fetcher<Category[]>("/coins/categories");
  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => category.name,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: (category) =>
        category.top_3_coins.map((coin) => (
          <Image src={coin} alt={coin} key={coin} width={28} height={28} />
        )),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: (category) => {
        const isTrendingUp = category.market_cap_change_24h > 0;
        return (
          <div
            className={cn(
              "change-cell",
              isTrendingUp ? "text-green-500" : "text-red-500",
            )}
          >
            <p className="flex items-center gap-1">
                {formatPercentage(category.market_cap_change_24h)}
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (category) => formatCurrency(category.market_cap),
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (category) => formatCurrency(category.volume_24h),
    },
  ];
  return (
    <div id="categories" className="custom-scrollbar pt-4">
      <h4>Top Categories</h4>
      <DataTable
        columns={columns}
        data={categories?.slice(0, 10)}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  );
};

export default Categories;
