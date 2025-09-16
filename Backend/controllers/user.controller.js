import user from "../models/user.model.js";
import jwt from "jsonwebtoken";

const loginMethod = async (req, res) => {
    if (!req.body) throw new error("Body is not available in request!");
    const { email = null, password = null, username = null } = req.body;

    if ((!email || !password) && (!username || !password)) {
        return res.status(401).json({ message: "Bad Request! empty fields" });
    }

    const userExistence = await user.findOne({
        $or: [{ username: username }, { email: email }],
    });
    if (!userExistence) {
        return res.status()(
            "This user does not exist. please create your account or try with correct credentials."
        );
    }

    const isCorrect = await userExistence.isPasswordCorrect(password);

    if (isCorrect) {
        const refreshToken = await userExistence.generateRefreshToken();

        userExistence.refreshToken = refreshToken;
        await userExistence.save();

        const accessToken = await userExistence.generateAccessToken();
        return res
            .status(200)
            .cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true, // set false on localhost
                sameSite: "strict",
            })
            .json({
                success: true,
                message: "Login successful",
                user: {
                    id: userExistence._id,
                    email: userExistence.email,
                    username: userExistence.username,
                },
            });
    } else {
        return res.status(401).json({ message: "This password is incorrect" });
    }
};
const signupMethod = async (req, res) => {
    console.log("Signup method invoked!");

    let {
        email = null,
        username = null,
        password = null,
        fullName = null,
        age = null,
    } = req.body;
    age = parseInt(age);

    if (!email || !password || !username || !password || !fullName || !age) {
        return res.send({ message: "Bad Request! empty fields" });
    }

    const usernameExistence = await user.findOne({ username: username });
    if (usernameExistence) {
        return res.status(300).send({
            message:
                "This username is already taken with a Qore account. please choose a unique username.",
        });
    }

    const userExistence = await user.findOne({ email: email });
    if (userExistence) {
        return res.status(300).send({
            message:
                "This email is already associated with a Qore account. please login.",
        });
    }

    const userInstance = await user.create({
        email,
        username,
        password,
        fullName,
        age,
    });

    if (userInstance) {
        return res.status(200).send({
            success: true,
            message: "User created successfully. pleaase login to continue.",
            userId: userInstance._id,
        });
    }
};
const logoutMethod = () => {};

export { loginMethod, signupMethod, logoutMethod };
