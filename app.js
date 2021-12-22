const express = require("express")
const util = require("./util")

const app = express()

app.get(["/", "/wiki/"], async (req, res, next) => {
  await util.doItAll(res, next, util.data("index.md"))
})

app.get("/wiki/:catagory::item", async (req, res, next) => {
  const catagory = req.params.catagory.toLowerCase()
  const item = req.params.item.toLowerCase()

  let path = util.data(catagory, item) + ".md"
  await util.doItAll(res, next, path)
})

app.get("/wiki/:item", async (req, res, next) => {
  const item = req.params.item.toLowerCase()
  let path = util.data(item + ".md")
  await util.doItAll(res, next, path)
})

app.use((err, req, res, next) => {
  res.send(`Error: ${err}`)
  //console.error(err)
})

module.exports = app
