import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
    const { id } = useParams();

    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${API_URL}/${id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch coin data");
                }

                const data = await res.json();
                setCoin(data);
                setError(null);

            } catch (err) {
                console.error(err);
                setError(err.message);
                setCoin(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCoin();
    }, [id]);

    // ✅ Spinner instead of text loading
    if (loading) return <Spinner />;

    if (error) return <h1 className="error">{error}</h1>;
    if (!coin) return <h1>No coin data found</h1>;

    const formatNumber = (num) =>
        num ? num.toLocaleString() : "N/A";

    const formatPrice = (num) =>
        num ? `$${num.toLocaleString()}` : "N/A";

    return (
        <div className="coin-details-container">

            <h1 className="coin-details-title">
                {coin.name} ({coin.symbol?.toUpperCase()})
            </h1>

            <img
                src={coin.image?.large}
                alt={coin.name}
                className="coin-details-image"
            />

            <p>
                {coin.description?.en
                    ? coin.description.en.split(". ").slice(0, 3).join(". ") + "."
                    : "No description available."}
            </p>

            <div className="coin-details-info">
                <h3>Rank: #{coin.market_cap_rank ?? "N/A"}</h3>

                <h3>
                    Current Price: {formatPrice(coin.market_data?.current_price?.usd)}
                </h3>

                <h4>
                    Market Cap: {formatPrice(coin.market_data?.market_cap?.usd)}
                </h4>

                <h4>
                    24h High: {formatPrice(coin.market_data?.high_24h?.usd)}
                </h4>

                <h4>
                    24h Low: {formatPrice(coin.market_data?.low_24h?.usd)}
                </h4>

                <h4>
                    24h Price Change:{" "}
                    {coin.market_data?.price_change_24h?.toFixed(2) ?? "N/A"} (
                    {coin.market_data?.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%)
                </h4>

                <h4>
                    Total Supply: {formatNumber(coin.market_data?.total_supply)}
                </h4>

                <h4>
                    All-time Low:{" "}
                    {formatPrice(coin.market_data?.atl?.usd)} on{" "}
                    {coin.market_data?.atl_date?.usd
                        ? new Date(coin.market_data.atl_date.usd).toLocaleDateString()
                        : "N/A"}
                </h4>

                <h4>
                    Last Updated:{" "}
                    {coin.last_updated
                        ? new Date(coin.last_updated).toLocaleDateString()
                        : "N/A"}
                </h4>
            </div>

            <CoinChart coinId= {coin.id}/>

            <div className="coin-details-links">
                {coin.links?.homepage?.[0] && (
                    <p>
                        🌐{" "}
                        <a
                            href={coin.links.homepage[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Website
                        </a>
                    </p>
                )}

                {coin.links?.blockchain_site?.[0] && (
                    <p>
                        🔗{" "}
                        <a
                            href={coin.links.blockchain_site[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Blockchain Explorer
                        </a>
                    </p>
                )}

                {coin.categories?.length > 0 && (
                    <p>Categories: {coin.categories.join(", ")}</p>
                )}
            </div>

            <Link to="/" className="back-btn">
                ← Back To Home
            </Link>
        </div>
    );
};

export default CoinDetailsPage;