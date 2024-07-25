import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import { assertIsDefined } from "../util/assertIsDefined";
import { assertIsValidEncodedValue } from "../util/assertIsValidEncodedValue";
import bcrypt from "bcrypt";
import { alterKey } from "../util/alterKey";

export const getAll: RequestHandler = async (req, res, next) => {
    try {
        const allUsers = await UserModel.find();
        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    console.log("trying to get authenticated user -----------------000-----------------");
    console.log(req.session.userId);
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        console.log("user");
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

interface SignUpBody {
    name?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    console.log("trying to sign up -----------------000-----------------");

    try {
        if (!name || !email || !passwordRaw) {
            throw createHttpError(409, "Parameters missing");
        }

        const lowercaseEmail = email.toLowerCase();

        const existingEmail = await UserModel.findOne({ email: lowercaseEmail }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const alkKey = alterKey(passwordRaw);

        const newUser = await UserModel.create({
            name: name,
            email: lowercaseEmail,
            password: passwordHashed,
            fish: "00000000000000000000000000000000000000000000000000000000000000000000000000000000",
            bug: "00000000000000000000000000000000000000000000000000000000000000000000000000000000",
            sealife: "0000000000000000000000000000000000000000",
            alkKey: alkKey
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    email?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log('trying to log in -----------------000-----------------');

    try {
        if (!email || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const lowercaseEmail = email.toLowerCase();

        const user = await UserModel.findOne({ email: lowercaseEmail }).select("+password").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

interface UpdateCritterParams {
    critterType: "bug" | "fish" | "sealife",
}

interface UpdateCritterBody {
    encodedString: string,
}

export const updateCritter: RequestHandler<UpdateCritterParams, unknown, UpdateCritterBody, unknown> = async (req, res, next) => {
    const critterType = req.params.critterType;
    const encodedString = req.body.encodedString;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!critterType) {
            throw createHttpError(401, "Must specify which critter type to update");
        }
        if (critterType !== "fish" && critterType !== "bug" && critterType !== "sealife") {
            throw createHttpError(401, "Must specify a valid critter");
        }
        if (!encodedString) {
            throw createHttpError(401, "Must provided new encoded string.");
        }
        assertIsValidEncodedValue(critterType, encodedString);

        const user = await UserModel.findOne({ _id: authenticatedUserId }).exec();

        if (!user) {
            throw createHttpError(401, "User not found");
        }

        user[critterType] = encodedString;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
}