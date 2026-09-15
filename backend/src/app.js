import express from "express";
import serviceRouter from "./routes/service.routes.js";

const app = express();

/**
 * |---- MIDDLEWARES ----|
 *  app.use(express.json()) parses JSON request bodies
 *  app.use(express.urlencoded Parses form data (like HTML forms)
 * */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * |---- ROUTES ----|
 *
 *
 * */
app.use("/", serviceRouter);

export default app;
