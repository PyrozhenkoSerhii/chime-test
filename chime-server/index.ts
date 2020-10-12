import * as path from "path";
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import {chimeRouter} from "./chime";

const PORT = Number(process.env.PORT);

const app = express();

const clientDistFolder =  "../client/dist";

console.log(`> Serving frontend from ${clientDistFolder}`);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, clientDistFolder)));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, clientDistFolder, "index.html"));
});

app.use("/api", chimeRouter);

app.listen(PORT, () => {
  console.log(`> Server running on port ${PORT}`);
});