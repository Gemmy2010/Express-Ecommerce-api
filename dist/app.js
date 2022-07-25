"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_database_1 = __importDefault(require("./database/mongo.database"));
const product_route_1 = __importDefault(require("./route/product.route"));
const auth_route_1 = __importDefault(require("./route/auth.route"));
const user_route_1 = __importDefault(require("./route/user.route"));
const review_route_1 = __importDefault(require("./route/review.route"));
const globalError_1 = require("./middleware/globalError");
require("dotenv").config();
(0, mongo_database_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Products resource
app.use("/products", product_route_1.default);
app.use("/auth", auth_route_1.default);
app.use("/user", user_route_1.default);
app.use("/reviews", review_route_1.default);
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
app.all("*", (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    res.status(404);
    next(error);
});
app.use(globalError_1.globalError);
app.listen(5000, () => console.log(`Server running on port ${5000}`));
