import { Router } from "express";
import userRouter from "./users";
import todoRouter from "./todos";

const apiRouter = Router();

apiRouter.get("/", (req,res) =>{
    return res.send("routeHomeApi")
});

apiRouter.use("/todos", todoRouter);
apiRouter.use('/users', userRouter );

export default apiRouter;