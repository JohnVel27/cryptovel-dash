import { Link } from "react-router";

const CoinCard = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
    <div className="coin-card">
      <div className="coin-header">
        <img
          src={coin?.image}
          alt={coin?.name}
          className="coin-image"
        />

        <div>
          <h2>{coin?.name}</h2>
          <p className="symbol">
            {coin?.symbol?.toUpperCase() ?? "N/A"}
          </p>
        </div>
      </div>

      <p>
        Price: $
        {coin?.current_price != null
          ? coin.current_price.toLocaleString()
          : "N/A"}
      </p>

      <p
        className={
          coin?.price_change_percentage_24h >= 0
            ? "positive"
            : "negative"
        }
      >
        {coin?.price_change_percentage_24h != null
          ? coin.price_change_percentage_24h.toFixed(2)
          : "0.00"}{" "}
        %
      </p>

      <p>
        Market Cap:{" "}
        {coin?.market_cap != null
          ? coin.market_cap.toLocaleString()
          : "N/A"}
      </p>
    </div>
  </Link>
  );
};

export default CoinCard;