import express from "express"
import cors from "cors"
import routes from "./routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(express.static('public'))

app.listen(3000, function() {
    console.log("aplicação executando na porta 3000")
})