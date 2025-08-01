const express = require("express");
const app = express();

app.use(express.json());

let clubs = [
  { id: 1, name: "Arsenal", stadium: "Emirates" },
  { id: 2, name: "Liverpool", stadium: "Anfield" },
  { id: 3, name: "New Castle", stadium: "St.James" },
];

app.get("/clubs", (req, res) => {
  res.json(clubs);
});

app.get("/clubs/:id", (req, res) => {
  const club = clubs.find((c) => c.id == parseInt(req.params.id));
  if (!club) return res.status(404).json({ message: "Club not found" });
  res.json(club);
});

app.post("/clubs", (req, res) => {
  const newClub = { id: Date.now(), ...req.body };
  clubs.push(newClub);
  res.status(201).json(newClub);
});

app.put("/clubs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const clubIndex = clubs.findIndex((c) => c.id === id);
  if (clubIndex === -1)
    return res.status(404).json({ message: "Club Not Found" });

  const updateClub = { ...clubs[clubIndex], ...req.body };
  clubs[clubIndex] = updateClub;
  res.json(updateClub);
});

app.delete("/clubs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const clubIndex = clubs.findIndex((c) => c.id === id);

  if (clubIndex === -1)
    return res.status(404).json({ message: "Club Not Found" });

  const deleteCLub = clubs.splice(clubIndex, 1);
  res.json({ message: "Club deleted", data: delete [0] });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
