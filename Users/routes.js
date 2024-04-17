import * as dao from "./dao.js";

// let currentUser = null;

export default function UserRoutes(app) {
    const createUser = async (req, res) => { 
        try {
            const user = req.body;
            const newUser = await dao.createUser(user);
            res.json(newUser);
        } catch (error) {
            console.error("Failed to create user:", error);
            res.status(500).json({ message: "Failed to create user" });
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const status = await dao.deleteUser(req.params.userId);
            if (status.deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
            res.status(500).json({ message: "Failed to delete user", error: error.toString() });
        }
     };

    const findAllUsers = async (req, res) => {
        try {
            const { role } = req.query;
            if (role) {
                const users = await dao.findUsersByRole(role);
                res.json(users);
                return;
            }
            const users = await dao.findAllUsers(); 
            res.json(users);
            return;
        } catch (error) {
            console.error("Failed to retrieve users:", error);
            res.status(500).json({ message: "Failed to retrieve users" });
        }
    };
    
    const findUserById = async (req, res) => {
        const { userId } = req.params;
        const user = await dao.findUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("User not found");
        }
     };

    const updateUser = async (req, res) => { 
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        if (currentUser) {
            res.json(currentUser);
        } else {    
            res.status(404).send("User not found");
        }
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                {message: "Username already taken"});
                return; // Exit the function - professor's code didn't have this. could lead to issues
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({message: "Invalid credentials"});
        }
    };

    const signout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(204);
     };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(403).json({message: "Not logged in"});
            return;
        }
        res.json(currentUser);
     };

    app.post("/api/users", createUser);

    app.get("/api/users", findAllUsers);

    app.get("/api/users/:userId", findUserById);

    app.put("/api/users/:userId", updateUser);

    app.delete("/api/users/:userId", deleteUser);

    app.post("/api/users/signup", signup);

    app.post("/api/users/signin", signin);

    app.post("/api/users/signout", signout);

    app.post("/api/users/profile", profile);


}
