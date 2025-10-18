/** @format */

import { cn } from "@/util/ClassCombine";
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
    <div className="bg-slate-600 flex flex-col h-full min-h-dvh w-dvw p-16 place-self-center">
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
// DATA TYPE FOR SHIP TYPE (E.G Destroyer, cruiser, battleship, airc-arrier)
type shipClass =
  | "Cruiser"
  | "Destroyer"
  | "Battleship"
  | "AirCarrier"
  | "Submarine";

type nationClass =
  | "netherlands"
  | "usa"
  | "commonwealth"
  | "europe"
  | "germany"
  | "ussr"
  | "italy"
  | "pan_america"
  | "japan"
  | "uk"
  | "pan_asia"
  | "france"
  | "spain";

// DATA TYPE FOR SHIPS
// This describes what each "ship" looks like in JSON data.
interface shipData {
  price_gold: number;
  images: {
    large: string;
  };
  nation: nationClass;
  tier: number;
  type: shipClass;
  name: string;
}

// COLOUR MAPPING
// This array links a nation's name to a background colour.
// If the ship's nation matches, the background will change accordingly.

const colour = [
  {
    nation: "netherlands",
    bg: "bg-gradient-to-r from-orange-200 to-orange-400",
  },
  { nation: "usa", bg: "bg-gradient-to-r from-blue-200 to-blue-400" },
  {
    nation: "commonwealth",
    bg: "bg-gradient-to-r from-amber-100 to-yellow-300",
  },
  { nation: "europe", bg: "bg-gradient-to-r from-indigo-100 to-indigo-300" },
  { nation: "germany", bg: "bg-gradient-to-r from-stone-200 to-yellow-300" },
  { nation: "ussr", bg: "bg-gradient-to-r from-red-200 to-red-400" },
  { nation: "italy", bg: "bg-gradient-to-r from-green-200 to-green-400" },
  { nation: "pan_america", bg: "bg-gradient-to-r from-cyan-100 to-teal-300" },
  { nation: "japan", bg: "bg-gradient-to-r from-neutral-100 to-rose-200" },
  { nation: "uk", bg: "bg-gradient-to-r from-blue-100 to-blue-300" },
  {
    nation: "pan_asia",
    bg: "bg-gradient-to-r from-emerald-100 to-emerald-300",
  },
  { nation: "france", bg: "bg-gradient-to-r from-blue-100 to-rose-200" },
  { nation: "spain", bg: "bg-gradient-to-r from-red-100 to-amber-200" },
];

// SHIP CARD COMPONENT
// This component shows the details for one ship.
// It receives a single ship's data as a prop (`{ data }`).
export function ShipCard({ data }: { data: shipData }) {
  return (
    <div
      className={cn(
        "flex flex-col w-48 bg-blue-400 overflow-clip h-68 rounded-4xl p-2",
        colour.find((el) => el.nation === data.nation)?.bg
      )}>
      {/* Show the ship's image */}
      <div className="rounded-4xl  relative w-full bg-cover bg-center aspect-video">
        <div className={cn(`bg-[url(/map.png)] w-full h-full absolute`, GetClassIcon(data.type))} />
        <img className="absolute w-full z-10" src={data.images.large} />
      </div>

      {/* Display text information about the ship */}
      {/* <div className="flex flex-col gap-1 text-center w-full h-full">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p>Price: {data.price_gold}</p>
        <div>
          <img src={GetNationIcon(data.nation)} alt="" />
        </div> */}

      {/* Small section showing the tier and type */}
      {/* <div className="flex justify-between place-items-center w-3/4 place-self-center">
          <p>Tier: {data.tier}</p>
        </div>
      </div> */}
    </div>
  );
}

function GetClassIcon(sClass: shipClass) {
  switch (sClass) {
    case "Cruiser":
      return "mask-cover mask-[url(ClassIcons/cruiser.png)]";
    case "Destroyer":
      return "mask-cover mask-[url(ClassIcons/destroyer.png)]";
    case "Battleship":
      return "mask-cover mask-[url(ClassIcons/battleship.png)]";
    case "AirCarrier":
      return "mask-cover mask-[url(ClassIcons/aircraft_carrier.png)]";
    case "Submarine":
      return "mask-cover mask-[url(ClassIcons/submarine.png)]";
  }
}

function GetNationIcon(nClass: nationClass) {
  switch (nClass) {
    case "netherlands":
      return "/Nation/Netherlands.png";
    case "usa":
      return "/Nation/USA.png";
    case "commonwealth":
      return "/Nation/Commonwealth.png";
    case "europe":
      return "/Nation/Europe.png";
    case "germany":
      return "/Nation/Germany.png";
    case "ussr":
      return "/Nation/USSR.webp";
    case "italy":
      return "/Nation/Italy.png";
    case "pan_america":
      return "/Nation/Pan_America.png";
    case "japan":
      return "/Nation/Japan.png";
    case "uk":
      return "/Nation/UK.webp";
    case "pan_asia":
      return "/Nation/Pan_Asia.png";
    case "france":
      return "/Nation/France.png";
    case "spain":
      return "/Nation/Spain.jpg";
  }
}
