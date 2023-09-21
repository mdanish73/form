const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.post("/login", async (req, res) => {
    try {
        var data = {
            username: "admin",
            password: "admin123"
        };

        var userData = req.body;

        if ((userData.username === data.username) && (userData.password === data.password)) {
            var token = jwt.sign({ username: "admin" }, "userLoginCredentials___786", { expiresIn: "300s" });

            res.cookie("accessToken", token, { secure: true, httpOnly: true });

            res.json({
                success: true,
                message: "Logged In Successfully."
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Invalid Username or Password."
            });
        };
    } catch {
        res.send(500).json({
            success: false,
            message: "Something went wrong, Try again later."
        });
    }
});

module.exports = router;