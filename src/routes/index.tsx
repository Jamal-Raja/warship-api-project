import { cn } from '@/util/ClassCombine'
import { createFileRoute } from '@tanstack/react-router'
import { useState, type JSX } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

// ----------------------
// MAIN APP COMPONENT
// ----------------------
function App() {
  const [data, setData] = useState<JSX.Element>()

  // Define a small component that renders a button.
  // When the button is clicked, it runs `GetAllShips()` (see below).
  const Button = () => {
    return (
      <button
        className="bg-amber-300 w-fit h-fit p-4 py-2 rounded-lg hover:brightness-75 hover:scale-110 duration-300 ease-in-out"
        onClick={() => {
          GetAllShips()
        }}
      >
        Click me
      </button>
    )
  }

  // ----------------------
  // FUNCTION TO FETCH SHIP DATA
  // ----------------------
  async function GetAllShips() {
    try {
      // Try to load data from your local JSON file.
      const response = await fetch('../../testData.json')

      if (!response.ok) {
        throw new Error('Could not fetch resource')
      }

      // Convert the raw response into usable JSON.
      const rawData = await response.json()
      // Extract the `data` property from your JSON structure.
      const data = rawData.data

      // Convert the object into an array and map over it.
      // For each ship, render a ShipCard component.
      // The `key={index}` ensures each item has a unique key (needed by React).
      const first = Object.values(data).map((item, index) => (
        <ShipCard key={index} data={item as shipData} />
      ))

      // Save the list of ShipCards to your state so they show up on screen.
      setData(
        <div className="w-full grid grid-cols-1 gap-2.5 sm:grid-cols-2 2xl:grid-cols-4 flex-wrap">
          {first}
        </div>,
      )
    } catch (err) {
      console.error(err)
    }
  }

  // ----------------------
  // JSX THAT DEFINES WHAT SHOWS ON SCREEN
  // ----------------------
  return (
    <div className="bg-slate-600 flex h-dvh w-dvw p-16">
      {/* Render the button we defined above */}
      <Button />

      {/* Render the grid of ship cards (or show 'No Data' if none exist) */}
      <div>{data ?? <p>No Data</p>}</div>
    </div>
  )
}

// ----------------------
// DATA TYPE FOR SHIPS
// ----------------------
// This describes what each "ship" looks like in JSON data.
interface shipData {
  price_gold: number
  images: {
    large: string
  }
  nation: string
  tier: number
  type: string
  name: string
}

// ----------------------
// COLOUR MAPPING
// ----------------------
// This array links a nation's name to a background colour.
// If the ship's nation matches, the background will change accordingly.
const colour = [{ nation: 'netherlands', bg: 'bg-orange-300' }]

// ----------------------
// SHIP CARD COMPONENT
// ----------------------
// This component shows the details for one ship.
// It receives a single ship's data as a prop (`{ data }`).
export function ShipCard({ data }: { data: shipData }) {
  return (
    <div
      // Merge the base styles with a dynamic background colour
      // depending on which nation the ship belongs to.
      className={cn(
        'flex flex-col w-64 bg-blue-400 overflow-clip h-min rounded-4xl p-2',
        colour.find((el) => el.nation === data.nation)?.bg,
      )}
    >
      {/* Show the ship's image */}
      <img className="w-full h-full" src={data.images.large} />

      {/* Display text information about the ship */}
      <div className="flex flex-col gap-1 text-center w-full h-full">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p>Price: {data.price_gold}</p>
        <p>Nation: {data.nation}</p>

        {/* Small section showing the tier and type */}
        <div className="flex justify-between w-2/3 place-self-center">
          <p>Tier: {data.tier}</p>
          <p>Type: {data.type}</p>
        </div>
      </div>
    </div>
  )
}
