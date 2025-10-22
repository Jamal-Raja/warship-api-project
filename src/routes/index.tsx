/** @format */

import { ShipImage } from "@/components/ShipImage";
import { cn } from "@/util/ClassCombine";
import { GetClassIcon, GetNationIcon, nationColour } from "@/util/NationIcons";
import type { shipData } from "@/util/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

// MAIN APP COMPONENT
function App() {
  const [data, setData] = useState<shipData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const sData = await GetAllShips();
      setData(sData);
    };

    fetchData();
  }, []);

  // FUNCTION TO FETCH SHIP DATA
  async function GetAllShips() {
    console.log("HIT");
    try {
      // Try to load data from your local JSON file.
      const response = await fetch("../../testData.json");
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      // Convert the raw response into usable JSON.
      const rawData = await response.json();
      // Extract the `data` property from your JSON structure.
      const data = rawData.data;

      // Turn kvp data into array
      const dataArr = Object.values(data).map((item) => item as shipData);
      return dataArr;
    } catch (err) {
      console.error(err);
    }
  }

  const shipData = (data: shipData[] | undefined) => {
    const shipArr = data?.map((item, key) => {
      return <ShipCard data={item} key={key} />;
    });
    return shipArr;
  };

  // JSX THAT DEFINES WHAT SHOWS ON SCREEN
  return (
    <div className="flex flex-col h-full min-h-dvh w-dvw p-16 place-self-center">
      <div>
        <h1>Wows Wiki</h1>
      </div>
      <h2>Ships</h2>
      <div className="flex flex-row flex-wrap w-full gap-2 justify-center">
        {shipData(data) ?? <div>Click the button</div>}
      </div>
    </div>
  );
}

// SHIP CARD COMPONENT
// This component shows the details for one ship.
// It receives a single ship's data as a prop (`{ data }`).
export function ShipCard({ data }: { data: shipData }) {
  return (
    <a
      href={`/ship/${data.ship_id}`}
      className={cn(
        "flex flex-col w-84 bg-blue-400 overflow-clip h-min rounded-xl hover:-translate-y-2 duration-200",
        nationColour.find((el) => el.nation === data.nation)?.bg
      )}>
      {/* Show the ship's image */}
      <ShipImage
      className="rounded-none"
        imgUrl={data.images.large}
        type={data.type}
        premium={true}
      />
      {/* Display text information about the ship */}
      <div className="flex flex-col w-full h-full place-items-center bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(0,0,0,0.6)_15%,rgba(0,0,0,0.6)_85%,rgba(255,255,255,0)_100%)]  ">
        <div className="flex flex-row gap-1 place-items-center text-center justify-center line-clamp-1 w-full h-full">
          <img
            className="w-8 aspect-video"
            src={GetNationIcon(data.nation)}
            alt=""
          />
          <h1 className="text-2xl font-bold">{data.name}</h1>
        </div>
        <div className="flex font-medium justify-evenly w-full">
          <p>
            Price:
            <span
              className={
                data.price_gold == 0 ? "text-green-500" : "text-amber-500"
              }>
              {" "}
              {data.price_gold == 0 ? "Free" : data.price_gold}{" "}
            </span>
          </p>
          <p>Tier: {data.tier}</p>
        </div>
      </div>
    </a>
  );
}
