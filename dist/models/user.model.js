"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [4, "You  name is too short"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} not supported",
        },
        required: [true, "User role is required"],
        default: "user",
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        if (!user.isModified("password"))
            return next();
        const salt = yield bcryptjs_1.default.genSalt(12);
        user.password = yield bcryptjs_1.default.hash(user.password, salt);
        return next();
    });
});
userSchema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        return yield bcryptjs_1.default
            .compare(enteredPassword, user === null || user === void 0 ? void 0 : user.password)
            .catch((error) => false);
    });
};
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
