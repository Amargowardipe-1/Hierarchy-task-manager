const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');


const getUserByRole = async (req, res) => {

    const { role, id } = req.user;

    try {

       

        if (role === "super-admin") {

            const users = await User.find();

            return res.status(200).json(users);

        }

        else if (role === "admin") {

            const currentAdmin = await User.findById(id);

            const managers = await User.find({
                reportsTo: id,
                role: "manager"
            });

            const managerIds = managers.map(
                (m) => m._id
            );

           
            const employees = await User.find({
                reportsTo: { $in: managerIds },
                role: "employee"
            });

            const users = [
                currentAdmin,
                ...managers,
                ...employees
            ];

            return res.status(200).json(users);

        }

        
        else if (role === "manager") {

            // CURRENT MANAGER
            const currentManager =
                await User.findById(id);

            // EMPLOYEES
            const employees = await User.find({
                reportsTo: id,
                role: "employee"
            });

            const users = [
                currentManager,
                ...employees
            ];

            return res.status(200).json(users);

        }

       

        else if (role === "employee") {

            const employee =
                await User.findById(id);

            return res.status(200).json([
                employee
            ]);

        }

       

        else {

            return res.status(403).json({
                message: "Access denied"
            });

        }

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};


const createUserByAdmin = async (req, res)=>{
    const {name, email, password, role, createdBy, reportsTo}= req.body;

    try {
        const existingUser = await User.findOne({role: "super-admin"});

        if (existingUser){
            return res.status(400).json({
                message: "Super Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const reportsToUser = await User.findById(reportsTo);

        if (!reportsToUser){
            return res.status(400).json({message: "Invalid reportsTo user"});
        }

        const newUser = new User({
            name,
            email,
            passwordHash: hashedPassword,
            role,
            createdBy,
            reportsTo: reportsToUser._id
        });

        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



const updateUserByAdmin = async (req, res)=>{
    const {id} = req.params;
    const {name, email, password, role, isActive}= req.body;

    try{
        const user = await User.findById(id);

        if (!user){
            return res.status(404).json({message: "User not found"});
        }

        // Update user fields
        user.name= name;
        user.email = email;
        user.role = role;
        user.isActive = isActive;

        // If password is provided, hash it
        if (password) {
            user.passwordHash = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



const deleteUserBySuperAdmin = async (req, res)=>{
    const {id} = req.params;

    try {
        const user = await User.findById(id);

        if (!user){
            return res.status(404).json({message: "User not found"});
        }
        await Task.deleteMany({assignedTo: user._id});
       
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});


    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

module.exports = { deleteUserBySuperAdmin, updateUserByAdmin , createUserByAdmin, getUserByRole};