/** @format */

import Feed from "@/components/Feed";
import { ShipCard } from "@/components/ShipCard";
import { cn } from "@/util/ClassCombine";
import { GetShipPage } from "@/util/queries";
import { type shipClass, type shipData } from "@/util/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

// MAIN APP COMPONENT
function App() {
  const [shipType, setShipType] = useState<shipClass | "">("");

  const { data, isPending, isError, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["ships" + shipType],
      staleTime: 1000 * 60 * 15,
      initialPageParam: 1,
      queryFn: ({ pageParam }) => GetShipPage({ pageParam, shipType }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasMore) return;
        return lastPage.nextPage;
      },
    });

  // useEffect(() => {
  //   // refetch();
  // }, [shipType]);

  if (isPending) return <h1>Loading</h1>;
  if (isError) return <h1>Error</h1>;

  const shipDataDisplay = (data: shipData[] | undefined) => {
    if (!data) return;
    const shipArr = data.map((item, key) => {
      return <ShipCard data={item} key={key} />;
    });
    return shipArr;
  };

  // JSX THAT DEFINES WHAT SHOWS ON SCREEN
  return (
    <div className="flex flex-col h-full min-h-dvh w-dvw py-16 px-2 place-self-center">
      <div>
        <h1>Wows Wiki</h1>
      </div>
      <h2>Ships</h2>
      <div className="flex w-full max-w-7xl place-self-center h-16 bg-brand rounded-md place-content-evenly">
        <button onClick={() => setShipType( shipType === "Submarine" ? "" : "Submarine")}>
          <img src="/ClassIcons/submarine.png" className={cn(`h-fit max-h-full cursor-pointer hover:scale-110 duration-300 ease-in-out active:scale-90`, shipType === "Submarine" ? "sepia-100 brightness-75" : "")} />
        </button>
        <button onClick={() => setShipType(shipType === "Destroyer" ? "" : "Destroyer" )}>
          <img src="/ClassIcons/destroyer.png" className={cn(`h-fit max-h-full cursor-pointer hover:scale-110 duration-300 ease-in-out active:scale-90`, shipType === "Destroyer" ? "sepia-100 brightness-75" : ""  )} />
        </button>
        <button onClick={() => setShipType(shipType === "Cruiser" ? "" : "Cruiser" )}>
          <img src="/ClassIcons/cruiser.png" className={cn(`h-fit max-h-full cursor-pointer hover:scale-110 duration-300 ease-in-out active:scale-90`, shipType === "Cruiser" ? "sepia-100 brightness-75" : "" )} />
        </button>
        <button onClick={() => setShipType(shipType === "Battleship" ? "" : "Battleship" )}>
          <img src="/ClassIcons/battleship.png" className={cn(`h-fit max-h-full cursor-pointer hover:scale-110 duration-300 ease-in-out active:scale-90`, shipType === "Battleship" ? "sepia-100 brightness-75" :"")} />
        </button>
        <button onClick={() => setShipType(shipType === "AirCarrier" ? "" : "AirCarrier" )}>
          <img
            src="/ClassIcons/aircraft_carrier.png"
            className={cn(`h-fit max-h-full cursor-pointer hover:scale-110 duration-300 ease-in-out active:scale-90`, shipType ==="AirCarrier" ? "sepia-100 brightness-75 ":"" )}
          />
        </button>
      </div>
      <Feed
        dataLength={data.pages.length} //maybe change???
        next={() => fetchNextPage()}
        hasMore={hasNextPage}>
        {shipDataDisplay(
          data.pages.flatMap((page) => {
            const data: shipData[] = page.data.map((e) => e);
            return data;
          })
        )}
      </Feed>
    </div>
  );
}
