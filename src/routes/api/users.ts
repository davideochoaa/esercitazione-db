import { Router } from "express";
import {sign, verify } from "jsonwebtoken";
import * as userController from "../../controllers/users.controller";

const userRouter = Router();

userRouter.get(
    "/private",
    (req, res, next) => {
      // auth mi restituisce Bearer <token>
      const auth = req.headers["authorization"];
      //@ts-ignore
      const token = /Bearer (.+)/.exec(auth)[1];
      console.log(token);
      //@ts-ignore
      const isAuthorized = verify(token, process.env.SECRET);
      if (isAuthorized) {
        next();
      } else {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    },
    (req, res) => res.json({ msg: "Hello, it's me" })
  );

userRouter.post("/", userController.create);

userRouter.get("/", userController.list);

userRouter.get("/:username", userController.show);

userRouter.get("/:username/todos", userController.userTodo);

userRouter.delete("/:id", userController.deleteUser);

userRouter.post("/login", userController.login);




export default userRouter;