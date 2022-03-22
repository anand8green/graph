const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer)

io.on('connection', (socket) => {

    // Generating stock data
    let stockTime = 1
    let stockData = []
    setInterval(() => {
        const newTime = stockTime++ + "s"
        const newValue = Math.round(Math.random() * 10 + 2)
        const newStockData = { time: newTime, value: newValue }
        stockData.push(newStockData)
        socket.emit("hello", stockData)
    }, 1000)

})

httpServer.listen(8000, () => {
    console.log("server on");
})
