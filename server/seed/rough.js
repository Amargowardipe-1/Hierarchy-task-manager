const existingAdmin = await User.findOne({
            role: "super-admin"
        });

        if (existingAdmin) {
            console.log("Super Admin already exists");
            process.exit();
        }