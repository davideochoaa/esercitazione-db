import { Router } from "express";
import * as todoControllers from "../../controllers/todos.controller";

const todoRouter = Router();

todoRouter.get("/", todoControllers.list);

todoRouter.post("/", todoControllers.store);

todoRouter.get("/:id", todoControllers.show);

todoRouter.put("/:id", todoControllers.update);

export default todoRouter;