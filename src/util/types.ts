// DATA TYPE FOR SHIP TYPE (E.G Destroyer, cruiser, battleship, airc-arrier)
export type shipClass =
  | "Cruiser"
  | "Destroyer"
  | "Battleship"
  | "AirCarrier"
  | "Submarine";

export type nationClass =
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
export interface shipData {
  price_gold: number;
  images: {
    large: string;
  };
  nation: nationClass;
  tier: number;
  type: shipClass;
  name: string;
  ship_id: number;
}
// SPECIFIC DATA TYPE FOR SHIPS
// This describes what each "ship" looks like in JSON data.
export interface SpecificShipData extends shipData {
  is_premium: boolean;
  default_profile: {
    mobility: {
      total: number;
      max_speed: number;
    };
    armour: {
      health: number;
      total: number;
    };
    concealment: {
      total: number;
    };
    weaponry: {
      artillery: number;
      anti_aircraft: number;
    };
  };
}