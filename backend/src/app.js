import express from "express";
import serviceRouter from "./routes/service.routes.js";
import barberRouter from "./routes/barber.routes.js";
import customerRouter from "./routes/customer.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import barber_scheduleRouter from "./routes/barber_schedule.routes.js";

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
app.use("/", barberRouter);
app.use("/", customerRouter);
app.use("/", appointmentRouter);
app.use("/", barber_scheduleRouter);

export default app;
