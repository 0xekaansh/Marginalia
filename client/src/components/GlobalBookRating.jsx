import axios from "axios";
import { useEffect, useState } from "react";

function GlobalBookRating({ bookWorkKey }) {
  const [ratingData, setRatingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookWorkKey) return;

    const fetchRating = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_OL_BASE_URL}${bookWorkKey}/ratings.json`,
        );

        setRatingData(result.data.summary);
      } catch (err) {
        console.error("Failed to fetch book ratings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [bookWorkKey]);

  if (loading) return <p>Loading rating...</p>;
  if (!ratingData || !ratingData.average) return <p>No global rating</p>;

  const formattedAverage = Number(ratingData.average).toFixed(1);
  return (
    <p>
      ★ {formattedAverage} / 5 ({ratingData.count} votes)
    </p>
  );
}

export default GlobalBookRating;
