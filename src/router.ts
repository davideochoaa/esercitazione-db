import { Router } from "express";
import prisma from "./prisma";

const router = Router();

router.get("/", (req,res) =>{
    return res.send("routerHome");
});

router.get("/api", (req,res) =>{
    return res.send("routeHomeApi")
})

router.get("/api/users", async (req,res) =>{
    const users = await prisma.user.findMany();
    return res.json(users);
})

router.post("/api/users", async (req,res) =>{
    const userData = req.body;
    const newUser = await prisma.user.create({data: userData});
    return res.json(newUser);
});

router.get("/api/users/:username", async (req,res) =>{
    const users = await prisma.user.findUnique({where: {username : "Gino_Paolino"}});
    return res.json(users);
});

/*router.put("/api/users", async (req,res) =>{

});*/

export default router;