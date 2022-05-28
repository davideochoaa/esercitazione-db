import { Request, Response } from "express";
import prisma from "../prisma";

// SHOW ALL TODO'S
export async function list (req:Request ,res:Response){
    const todos = await prisma.todo.findMany();
    return res.json(todos);
};

// CREATE THE TODO
export async function store (req: Request,res: Response){
    const todoData = req.body;
    const newTodo = await prisma.todo.create({data : todoData});
    return res.json(newTodo);
}

// SHOW THE TODO BY ID
export async function show (req: Request,res: Response){
    const {id} = req.params;
    const users = await prisma.todo.findUnique({where: {id : parseInt(id)}});
    return res.json(users);
}

//UPDATE TODO BY ID
export async function update (req: Request,res: Response){
    const dataOfTodos = req.body;
    const paramId = req.params;
    const id = Number(paramId['id']);
    
    try {
        const updatedTodo = await prisma.todo.update({
        where: {
                id: id,          
        }, data: {

            title: dataOfTodos.title,
            description: dataOfTodos.description,
            completed : dataOfTodos.completed,

        },
    });
    return res.status(201).send(updatedTodo);
    } catch (e) {
        return res.status(404).send({msg: "Your To Do Task is not found! Try another ID Task"});
    }
};
