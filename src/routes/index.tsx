import { cn } from '@/util/ClassCombine'
import { createFileRoute } from '@tanstack/react-router'
// import logo from '../logo.svg'
import { useState, type JSX } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [data, setData] = useState<JSX.Element>()

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

  async function GetAllShips() {
    try {
      const response = await fetch('../../testData.json')

      if (!response.ok) {
        throw new Error('Could not fetch resource')
      }

      const rawData = await response.json()
      const data = rawData.data
      const first = Object.values(data).map((item) => (
        <ShipCard data={item as shipData} />
      ))
      setData(<div>{first}</div>)
      // console.log(Object.values(data)[0].name) // For Debugging Purposes Only
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-slate-600 flex h-dvh w-dvw p-16">
      <Button />
      <div className="w-full grid grid-cols-1 gap-0 lg:gap-4 sm:grid-cols-2 2xl:grid-cols-4 flex-wrap">
        {data ?? <p>No Data</p>}
      </div>
    </div>
  )
}

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
const colour = [{ nation: 'netherlands', bg: 'bg-orange-300' }]

export function ShipCard({ data }: { data: shipData }) {
  return (
    <div
      className={cn(
        'flex flex-col w-64 bg-blue-400 overflow-clip h-min rounded-4xl p-2',
        colour.find((el) => el.nation === data.nation)?.bg,
      )}
    >
      <img className="w-full h-full" src={data.images.large} />
      <div className="flex flex-col gap-1 text-center w-full h-full">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p>Price: {data.price_gold}</p>
        <p>Nation: {data.nation}</p>
        <div className="flex justify-between w-2/3 place-self-center">
          <p>Tier: {data.tier}</p>
          <p>Type: {data.type}</p>
        </div>
      </div>
    </div>
  )
}

/*
  const res = await fetch("../../testData.json")
  const data = await res.json() ?? null;
  if(!data) return console.log("No Data"); // No Data
  */
