import express, { json } from "express";
import cors from "cors";
import { CarData, CarInfo } from "./model.js";
import mongoose from "mongoose";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(json());
app.post("/createCar", async (req, res) => {
  try {
    const { vehicleName, ownerName } = req.body;

    const data = await CarInfo.create({
      vehicleName,
      ownerName,
    });
    res.status(201).json({ ok: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.post("/postData", async (req, res) => {
  try {
    const { id, speed, fuelLevel, engineTemp } = req.body;
    let alerts = [];

    if (engineTemp > 220) alerts.push("HIGH_TEMP");
    else if (fuelLevel < 10) alerts.push("LOW_FUEL");
    else if (speed > 120) alerts.push("SPEED_ALERT");

    const data = await CarData.create({
      vehicleId: id,
      speed,
      fuelLevel,
      engineTemp,
      alerts,
    });

    // console.log(data);

    res.status(201).json({ ok: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/getData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CarData.aggregate([
      {
        $match: { vehicleId: new mongoose.Types.ObjectId(id) },
      },
    ]);
    res.status(202).json({ ok: true, data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/dashboard", async (req, res) => {
  try {
    const data = await CarInfo.aggregate([
      {
        $lookup: {
          from: "cardatas",
          localField: "_id",
          foreignField: "vehicleId",
          as: "vehicleInfo",
        },
      },
    ]);

    res.status(200).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carData = await CarInfo.findById(id);
    if (!carData) {
      return res.status(404).json({ error: "record not found" });
    }
    await CarInfo.findByIdAndDelete(id);
    await CarData.deleteMany({ vehicleId: carData._id });
    res.json({ message: "records deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
