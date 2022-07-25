import express, { Request, Response, Express, NextFunction } from "express";
import createMongooseConnection from "./database/mongo.database";
import ProductRouter from "./route/product.route";
import AuthRouter from "./route/auth.route";
import UserRouter from "./route/user.route";
import ReviewRouter from "./route/review.route";
import { globalError } from "./middleware/globalError";

require("dotenv").config();

createMongooseConnection();

const app: Express = express();

app.use(express.json());

// Products resource

app.use("/products", ProductRouter);
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/reviews", ReviewRouter);

// app.get("/products", getProducts);

// app.get("/products/:id", getProduct);

// app.post("/products", createProduct);

// app.delete("/products/:id", deleteProduct);

// app.put("/products/:id", updateProduct);

// app.patch("/products/:id", modifyProduct);

// Users Resource

//app.get("/users", getUsers);

// Auth Resource

// app.post("/auth/register", register);

// app.post("/auth/login", login);

// app.get("/auth/logout", logout);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
});

app.use(globalError);

app.listen(5000, () => console.log(`Server running on port ${5000}`));
