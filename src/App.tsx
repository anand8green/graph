import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Tooltip, XAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer, YAxis, Brush } from 'recharts'

const App: React.FC = () => {

  type stockDataProps = {
    time: string,
    value: number
  }[]

  const socket = io(("http://localhost:8000/"), {
    transports: ['websocket', 'polling']
  })

  const [stockData, setStockData] = useState<stockDataProps>([])

  useEffect(() => {
    socket.on("hello", (data) => {
      setStockData(() => data)
      console.log(data)
    }
    )
  }, [])

  console.log(stockData);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: 60, color: "#8884d8" }}>Graph Chart</h1>
      <ResponsiveContainer width={'100%'} height={700} >
        <BarChart data={stockData} layout="horizontal"  >
          <CartesianGrid stroke="#ccc" opacity={0.5} />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default App