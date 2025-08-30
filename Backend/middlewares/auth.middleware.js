const isLoggenIn = () => {
    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
    );

    //only generate access token if refresh token is have this.user.id
    decoded.id == userExistence._id;
};
