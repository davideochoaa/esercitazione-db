import { Request, Response } from "express";
import prisma from "../prisma";
import { verifyPassword } from "../utils";
import {sign, verify } from "jsonwebtoken";

// LIST OF ALL USERS
export async function list (req:Request ,res:Response){
    const users = await prisma.user.findMany();
    return res.json(users);
};

// SHOW USER INFORMATION ONLY BY USERNAME
export async function show (req: Request,res: Response){
    const {username} = req.params;
    const users = await prisma.user.findUnique({where: {username}});
    return res.json(users);
}

// CREATE USER 
export async function create (req: Request,res: Response){
    const userData = req.body;
    const newUser = await prisma.user.create({data: userData});
    return res.json(newUser);
}

// SHOW TO-DO TASK (USERNAME OF THE USER)
export async function userTodo (req: Request,res: Response){
    const {username} = req.params;
    try{
    const searchUsername = await prisma.user.findUnique({where : {username}});
    if(!searchUsername){
        return res.status(404).send({msg: "Cannot Find the User! Try another Username"});
    }
    const todosOfTheUser = await prisma.todo.findMany({where: {userId: searchUsername?.id}});
    return res.status(201).send(todosOfTheUser);
    } catch (e) {
        return res.status(500).send({msg: "Cannot find the post"});
    }
}

// DELETE THE USER
export async function deleteUser (req: Request, res: Response){
    const paramId = req.params;
    const id = Number(paramId['id']);
    try{
    const newUser = await prisma.user.delete({where: {id}});
    return res.status(201).send({msg: `The User: ${newUser.name} is deleted` });
    }catch (err){
        return res.status(404).send({msg: "Cannot Find The User"});
    }
}

export async function login (req: Request, res: Response){
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({msg: "Failed Login! Try another email or password"})
    }

    try{
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select:{
            password: true,
            id: true,
        },
    });

        if(user?.password && verifyPassword(password, user.password)) {
            //@ts-ignore
            const token = sign(`${user.id}`, process.env.SECRET)
            return res.status(200).json({accessToke: token });
        }else{
            return res.status(401).send({msg :"Wrong Credential"});
        }
    }catch(error) {
        return res.status(404).json({msg: "Wrong Mail or Password! :("});
    }
}