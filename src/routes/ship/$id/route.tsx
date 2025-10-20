/** @format */

import type { SpecificShipData } from "@/util/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ship/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [data, setData] = useState<SpecificShipData>();

  useEffect(() => {
    const fetchData = async () => {
      const ssData = await fetchSpecificShipData();
      setData(ssData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row p-2 gap-2">
        {/* Left side */}
        <div className="flex-1 md:w-1/2 rounded-2xl p-3 outline">
          <img className="w-full rounded-xl" src={data?.images.large} alt="" />
          <div className="flex flex-row justify-between px-6 py-2">
            <h1 className="font-display font-bold text-3xl h-min my-auto">
              {data?.name}
            </h1>
            <div className="flex flex-row gap-2 text-center">
              <div className="min-w-14">
                <h1>Nation:</h1>
                <p>{capitalizeFirstLetter(data?.nation)}</p>
              </div>
              <div className="min-w-14">
                <h1>Tier:</h1>
                <p>{data?.tier}</p>
              </div>
              <div className="min-w-14">
                <h1>Price:</h1>
                <p>{data?.price_gold}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 md:w-1/2 rounded-2xl p-3 outline">
          <h1 className="font-bold text-[1.25rem]">Description</h1>
          <p>{data?.description}</p>
          <ul className="overflow-hidden">
            <ShipParam
              name="Mobility"
              value={data?.default_profile.mobility.total!}
            />
            <ShipParam
              name="Armour"
              value={data?.default_profile.armour.total!}
            />
            <ShipParam
              name="Concealment"
              value={data?.default_profile.concealment.total!}
            />
            <ShipParam
              name="Artillery"
              value={data?.default_profile.weaponry.artillery!}
            />
            <ShipParam
              name="Anti aircraft"
              value={data?.default_profile.weaponry.anti_aircraft!}
            />
          </ul>
        </div>
      </div>
    </>
  );
}

function ShipParam({ value, name }: { value: number; name: string }) {
  return (
    <div className="relative w-full h-8 items-center flex my-1 justify-start rounded-full overflow-hidden">
      <progress
        value={value}
        max={100}
        className="absolute w-full h-[80%] border-2 rounded-full"
      />
      <li className="absolute text-white px-2.5">
        <span className="text-zinc-100">{name}</span>:{" "}
        <span className="font-medium text-zinc-50">{value}</span>
      </li>
    </div>
  );
}

async function fetchSpecificShipData() {
  try {
    const response = await fetch("../../../../testDataSpecific.json"); //replace with api call
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const rawData = await response.json();
    // Extract the `data` property from your JSON structure.
    const data = Object.values(rawData.data).at(0);
    return data as SpecificShipData;
  } catch (err) {
    console.error(err);
  }
}

function capitalizeFirstLetter(val: any) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
