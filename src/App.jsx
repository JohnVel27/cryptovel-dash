import { useState, useEffect, useRef } from "react";
import HomePage from "./pages/home";
import AboutPage from './pages/about';
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-detail";

import { Routes, Route } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  const cache = useRef({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      const cacheKey = `${limit}-${sortBy}`;

     
      if (cache.current[cacheKey]) {
        setCoins(cache.current[cacheKey]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (controller.signal.aborted) return;

        const res = await fetch(
          `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();

        cache.current[cacheKey] = data;

        setCoins(data);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    return () => controller.abort();
  }, [limit, sortBy]);

  return (
    <>
    
    <Header/>
    
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            coins={coins}
            filter={filter}
            setFilter={setFilter}
            setLimit={setLimit}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            error={error}
          />
        }
      />
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/coin/:id' element={<CoinDetailsPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>

    </>
  );
};

export default App;
