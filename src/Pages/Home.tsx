import {useEffect, useState} from "react";
import Card from "../Components/Card";
import {Api} from "../G_api";
import {Recipe} from "../types/recipetypes";
import SlidingBanner from "../Components/SlidingBanner";
export default function Home() {
  const [data, setData] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await fetch(`${Api}`);
      const res = await response.json();
      setData(res.recipes.slice(0, 20));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data);

  return (
    <div style={{paddingTop: "3.5rem", fontFamily: "Arial, sans-serif"}}>
      <SlidingBanner />
      <Card data={data} error={error} />
    </div>
  );
}
