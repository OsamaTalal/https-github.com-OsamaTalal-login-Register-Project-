import express from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

// in-memory
const users = [];

app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const findUser = users.find((data) => email == data.email);
        if (findUser) {
            return res.status(400).send("Email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Add user to the array
        users.push({ email, password: hashedPassword });
        console.log(users)
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.post("/login",async (req,res) =>{
    try{ 
       const { email, password} = req.body;
               // Find user
               const findUser = users.find((data) => email == data.email);
               if (!findUser) {
                    res.status(400).send("Wrong Email or password !");
               }
            const passwordMatch = await bcrypt.compare(password, findUser.password);

            if (passwordMatch){
                res.status(200).send("Logged in successfully!");
            } else {
                      res.status(400).send("Wrong Email or password !");
                
            }
        
    } catch(err){
        res.status(500).send({ message: err.message });
    }
})

app.listen(port, () => {
    console.log("Server is started on port 3000");
});
