import { cookieOptions, TryCatch } from "../utils/features.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({});

const getUser = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Not able to find the user"
        });
    };

    return res.status(200).json({
        success: true,
        user
    })
});

const logout = TryCatch(async (req, res) => {
    res.cookie("authToken", "", { ...cookieOptions, maxAge: 0 });

    return res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
})

const newUser = TryCatch(async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter valid data"
        })
    }

    const user = await User.findOne(email)
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exist"
        });
    };

    const hashPassword = await bcrypt.hash(10, process.env.JWT_STR)

    await User.create({
        firstname,
        lastname,
        email,
        password: hashPassword
    });

    return res.status(200).json({
        success: true,
        message: "User created successFully"
    })
})

const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter valid data"
        })
    }

    const user = await User.findeOne(email).select("+password");

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        return res.status(400).json({
            success: false,
            message: "Please enter valid data"
        })
    };

    const token = jwt.sign({ _id: user._id }, process.env.JWT_STR);

    res.cookie(
        "authToken",
        token,
        cookieOptions
    )

    return res.status(200).json({
        success: true,
        message: "Login successfully"
    });

});

const editUser = TryCatch(async (req, res) => {
    const { firstname, lastname } = req.body;

    if (!firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: "Please enter firstname or lastname",
        })
    };

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(200).json({
            success: false,
            message: "Not able to find the user"
        });
    };
    if (firstname) {
        user.firstname = firstname;
    }
    if (lastname) {
        user.lastname = lastname;
    };

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully"
    });
});

export {
    getUser,
    logout,
    newUser,
    login,
    editUser,
}