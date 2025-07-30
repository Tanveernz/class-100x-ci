import  express from "express";
import { prisma } from "@repo/db/client";


const app = express();
app.use(express.json());

app.get("/hi", (req, res) => {
    res.send({
        message: "hi there!"
    })
})

app.post("/debug", (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    res.json({
        headers: req.headers,
        body: req.body,
        hasBody: !!req.body
    });
})

app.post("/signup", async(req, res) => {
    try {
        // Check if req.body exists
        if (!req.body) {
            return res.status(400).json({
                error: "Request body is missing"
            });
        }
        
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        const user = await prisma.user.create({
          data: {
            username: username,
            password: password
          }
        });

        res.json({
            message: "signup successfull!",
            id: user.id
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
})


app.listen(3002, () => {
    console.log("server listening on the port 3002");

})