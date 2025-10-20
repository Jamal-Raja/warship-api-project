import type { nationClass, shipClass } from "./types";

export function GetNationIcon(nClass: nationClass) {
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

export function GetClassIcon(sClass: shipClass) {
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

// COLOUR MAPPING
// This array links a nation's name to a background colour.
// If the ship's nation matches, the background will change accordingly.

export const nationColour = [
  {
    nation: "netherlands",
    bg: "bg-orange-200",
  },
  { nation: "usa", bg: "bg-blue-200" },
  {
    nation: "commonwealth",
    bg: "bg-amber-100 ",
  },
  { nation: "europe", bg: "bg-indigo-100" },
  { nation: "germany", bg: "bg-stone-200 " },
  { nation: "ussr", bg: "bg-red-200" },
  { nation: "italy", bg: "bg-green-200 " },
  { nation: "pan_america", bg: "bg-cyan-200" },
  { nation: "japan", bg: "bg-neutral-200" },
  { nation: "uk", bg: "bg-blue-100" },
  {
    nation: "pan_asia",
    bg: "bg-emerald-300",
  },
  { nation: "france", bg: "bg-blue-100" },
  { nation: "spain", bg: "bg-red-100" },
];
