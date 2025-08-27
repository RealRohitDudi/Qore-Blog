import user from "mongoose";

const loginMethod = (req, res) => {
    if (!req.body) throw new error("Body is not available in request!");
    const { email = null, password = null, username = null } = req.body;

    const userExistence = user.find((username = username));
    if (!userExistence) {
        throw new error(
            "This user does not exist. please create your account or try with correct credentials."
        );
    }
    isPasswordCorrect();
};
const signupMethod = () => {
    //write this first
};
const logoutMethod = () => {};

export { loginMethod, signupMethod, logoutMethod };
