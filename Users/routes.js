import * as dao from "./dao.js";

let currentUser = null;

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
            const users = await dao.findAllUsers(); 
            res.json(users);
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

    const signup = async (req, res) => { };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            res.json(currentUser);
        } else {
            res.status(401).json({message: "Invalid credentials"});
        }
     };
    const signout = async (req, res) => { };
    const profile = async (req, res) => {
        res.json(currentUser);
     };

    app.post("/api/users", createUser);

    app.get("/api/users", findAllUsers);

    app.get("/api/users/:userId", findUserById);

    app.put("/api/users/:userId", updateUser);

    app.delete("/api/users/:userId", deleteUser);

    app.post("/api/signup", signup);

    app.post("/api/users/signin", signin);

    app.post("/api/signout", signout);

    app.post("/api/users/profile", profile);


}