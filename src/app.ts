// Entry point for application setup
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));