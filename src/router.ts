import { Router } from "express";
import apiRouter from "./routes/api/api";
import webRouter from "./routes/web";
import todoRouter from "./routes/api/todos"


const router = Router();

router.use('/api', apiRouter);
router.use("/web", webRouter);
router.use("/todos", todoRouter);

router.get("/", (req,res) =>{
    return res.send("routerHome");
});




/*router.put("/api/users", async (req,res) =>{

});*/

export default router;