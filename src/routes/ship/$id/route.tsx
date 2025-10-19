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
      <div className="flex rounded-4xl p-2 gap-1">
        {/* Left side */}
        <div className="flex-1 flex-col w-1/2 outline">
          <img className="w-full" src={data?.images.large} alt="" />
          <div className="flex flex-row justify-between px-6 py-2">
            <h1 className="font-test font-bold ">{data?.name}</h1>
            <p>{data?.nation}</p>
            <p>{data?.tier}</p>
            <p>{data?.price_gold}</p>
          </div>
        </div>
        {/* Right side */}
        <div className="flex-1 w-1/2 outline">
            <p>{data?.description}</p>
          <ul className="outline">
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
    <div className="relative w-full h-8 items-center flex">
      <progress value={value} max={100} className="absolute w-full h-full" />
      <li className="absolute">
        {name}:{value}
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
