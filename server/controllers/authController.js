const User = require("../models/User");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const loginUser =async (req,res)=>{
    const {email, password} =req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: "User not found"});

        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);


       if (!isMatch) {
 
            return res.status(400).json({
                message: "Invalid credentials"
            });  

        }
         // generate jwt token

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        

        });
        console.log("Login successful", user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        }); 

    }

};



const registerUser = async (req, res) => {

    const { name, email, password, role, createdBy, reportsTo } = req.body;
   
    try {
       if (role === "super-admin") {

    const existingUser = await User.findOne({
        role: "super-admin"
    });

    if (existingUser) {

        return res.status(400).json({
            message: "Super Admin already exists"
        });

    }
    
}
    const existingEmail = await User.findOne({ email: email.toLowerCase()});
     if (existingEmail) {

     return res.status(400).json({
      message: "Email already exists"
     });

    }
          
        const hashedPassword = await bcrypt.hash(password, 10);
        const reportsToUser = await User.findById(reportsTo);

        if (!reportsToUser){
            return res.status(400).json({message: "Invalid reportsTo user"});
        }

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            passwordHash: hashedPassword,
            role,
            createdBy,
            reportsTo: reportsToUser._id
        });

        await newUser.save();
         console.log(req.body);


        res.status(201).json({ message: "User registered successfully" });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};





const refreshToken = async (req, res) => {

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            message: "Refresh token required"
        });
    }

    try {

        // Verify refresh token
        const decoded = jwt.verify(
            token,
            process.env.REFRESH_SECRET
        );

        // Generate new access token
        const accessToken = jwt.sign(
            {
                id: decoded.id,
                role: decoded.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            accessToken
        });

    } catch (error) {

        res.status(401).json({
            message: "Invalid refresh token"
        });

    }

};




const logoutUser = async (req, res) => {

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            message: "Refresh token required"
        });
    }

    try {

        // delete refresh token from DB
        await RefreshToken.findOneAndDelete({
            token
        });

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error"
        });

    }

};

module.exports = {
    loginUser,
    registerUser,
    refreshToken,
    logoutUser
};