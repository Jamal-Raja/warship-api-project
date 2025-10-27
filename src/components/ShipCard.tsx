/** @format */

import { cn } from "@/util/ClassCombine";
import { GetNationIcon, nationColour } from "@/util/NationIcons";
import type { shipData } from "@/util/types";
import { ShipImage } from "./ShipImage";

export function ShipCard({ data }: { data: shipData }) {
  return (
    <a
      href={`/ship/${data.ship_id}`}
      className={cn(
        "flex flex-col w-[calc(33%-8px)] min-w-full sm:min-w-64 bg-blue-400 overflow-clip h-min rounded-xl hover:-translate-y-2 duration-200",
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
