const marked = require("marked")
const ejs = require("ejs")
const fs = require("fs")
const { promisify } = require("util")
const path = require("path")

const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)

const data = (...paths) => path.join(__dirname, "data", ...paths)

async function getFile(path) {
  return await readFile(path, "utf8")
}

function render(file, data) {
  return marked(ejs.render(file, data))
}

async function renderPath(path, data = {}) {
  const file = await getFile(path)
  return render(file, data)
}

async function doItAll(res, next, path, data = {}) {
  if (!(await exists(path))) return next(new Error("404 not found"))
  try {
    let rendered = await renderPath(path, { ...res.app.locals, ...data })
    res.send(rendered)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  data,
  getFile,
  render,
  renderPath,
  doItAll,
}
