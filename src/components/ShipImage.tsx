/** @format */

import { cn } from "@/util/ClassCombine";
import { GetClassIcon } from "@/util/NationIcons";
import type { shipClass } from "@/util/types";

export function ShipImage({
  imgUrl,
  type,
  premium,
  className,
}: {
  imgUrl: string;
  type: shipClass;
  premium: boolean;
  className?:string
}) {
  return (
    <div className={cn("w-full bg-cover bg-center flex relative rounded-xl overflow-clip", className)}>
      <div
        className={cn(
          `absolute flex w-full h-full z-50 `
        )}
      />
      <div
        className={cn(
          `absolute flex w-full h-full z-10`,
          "bg-[url(/map.png)] bg-bottom bg-cover",
          GetClassIcon(type)
        )}
      />
      <div className="bg-[url(/water.png)] z-5 bg-cover flex absolute w-full h-full" />
      <div className="bg-[url(/sky.png)] bg-center z-5 bg-cover flex absolute w-full h-full" />
      <div className="bg-gradient-to-b from-blue-600 to-blue-400 bg-cover flex absolute w-full h-full" />
      <img className="w-full rounded-xl z-10" src={imgUrl} alt="" />
    </div>
  );
}
