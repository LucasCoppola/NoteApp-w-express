const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const { v4: uuid } = require("uuid")
uuid()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

let notes = [
  {
    id: uuid(),
    title: "Correo number",
    note: "1904257PX4IGCPC",
  },
  {
    id: uuid(),
    title: "Bank Key",
    note: "REL",
  },
  {
    id: uuid(),
    title: "Remember",
    note: "Pick up the meat for dinner",
  },
]

app.get("/notes", (req, res) => {
  res.render("notes/index", { notes })
})

app.get("/notes/new", (req, res) => {
  res.render("notes/new")
})

app.post("/notes", (req, res) => {
  const { title, note } = req.body
  notes.push({ title, note, id: uuid() })
  res.redirect("/notes")
})

app.get("/notes/:id", (req, res) => {
  const { id } = req.params
  const note = notes.find((element) => element.id === id)
  res.render("notes/show", { note })
})

app.get("/notes/:id/edit", (req, res) => {
  const { id } = req.params
  const note = notes.find((element) => element.id === id)
  res.render("notes/edit", { note })
})

app.patch("/notes/:id", (req, res) => {
  const { id } = req.params
  const { title, note } = req.body
  const foundNote = notes.find((element) => element.id === id)
  foundNote.title = title
  foundNote.note = note
  res.redirect("/notes")
})

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params
  notes = notes.filter((element) => element.id !== id)
  res.redirect("/notes")
})

app.listen(8080, () => {
  console.log("On port 8080!")
})
