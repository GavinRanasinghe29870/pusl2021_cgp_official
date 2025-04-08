const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:3000/clubMaker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ClubSchema = new mongoose.Schema({
  clubName: String,
  location: String,
  description: String,
  clubLogo: String,
  images: [String],
  boardMembers: [{ name: String, position: String, image: String }],
  headCoach: {
    name: String,
    age: String,
    email: String,
    qualifications: String,
    sportHistory: String,
  },
  facilities: String,
  events: [{ image: String, description: String }],
  clubHistory: String,
  registrationFee: String,
});

const Club = mongoose.model("Club", ClubSchema);

// Create a new club entry
app.post("/club", async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).send(club);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get club details
app.get("/club", async (req, res) => {
  try {
    const club = await Club.findOne();
    res.send(club);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update club details
app.put("/club", async (req, res) => {
  try {
    const club = await Club.findOneAndUpdate({}, req.body, { new: true });
    res.send(club);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete club
app.delete("/club", async (req, res) => {
  try {
    await Club.deleteOne();
    res.send({ message: "Club deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
