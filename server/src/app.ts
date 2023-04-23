import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/register", require("./register/register.router"));
app.use("/auth", require("./auth/auth.router"));
app.use("/users", require("./user/user.router"));

app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    status: 404,
    message: `Path not found: ${req.originalUrl}`,
  });
});

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
};

app.use(handleError);

module.exports = app;
