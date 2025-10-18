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
      <div>Hello "/ship/{id}"!</div>
      <div className="flex ">
        {/* Left side */}
        <div className="flex-1 w-1/2 outline">
          <img src={data?.images.large} alt="" />
          <p>{data?.name}</p>
        </div>
        {/* Right side */}
        <div className="flex-1 w-1/2 outline">
          <ul className="outline ">
            <ShipParam value={data?.default_profile.mobility.total!} />

            {/*             
            <li>{data?.default_profile.armour.total}</li>
            <li>{data?.default_profile.weaponry.artillery}</li>
            <li>{data?.default_profile.weaponry.anti_aircraft}</li>
            <li>{data?.default_profile.concealment.total}</li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

function ShipParam({ value }: { value: number }) {
  return (
    <div className="relative w-full h-8 items-center flex">
      <progress value={value} max={100} className="absolute w-full h-full" />
      <li className="absolute">{value}</li>
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
