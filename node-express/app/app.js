const express = require("express")
const app = express()
const port = 3000
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile("index.html", (err) => {
        if (err)
            console.log(err)
    })
})

app.listen(port, () => {
    console.log('app is listening')
})