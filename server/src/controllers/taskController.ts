import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //to invoke prisma and grab data from db

//new fcn, exporting this so it can be called in router.get(), fcn takes req and res as arguments 
export const getTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {projectId} = req.query;

    try {
        const tasks = await prisma.task.findMany({
            where: { //conditions for grabing data from task table
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            },
        });
        res.json(tasks);//in response, return json of task

    } catch(error: any) {
        res.status(500).json({message: `Error retrieving tasks  ${error.message}`});
        //is sth goes wrong such as db connection fails, this catches the error, set http status code as 500
        //and send back error msg
    }
}



export const createTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { title, description, status, priority, tags, startDate, dueDate, points,
        projectId, authorUserId, assignedUserId
     } = req.body; //extract data from request

    try {
        const newTask = await prisma.task.create({
            data: {
                title, description, status, priority, tags, startDate, dueDate, points,
                projectId, authorUserId, assignedUserId
            }, //create and insert new row of data inside the Project table
        });
        res.status(201).json(newTask); //sends response back with 201 status code and json of new data

    } catch(error: any) {
        res.status(500).json({message: `Error creating a task: ${error.message}`});

    }
}


export const updateTaskStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {taskId} = req.params;
    const {status} = req.body;


    try {
        const updatedTask = await prisma.task.update({
            where: { //conditions for grabing data from task table
                id: Number(taskId),
            },
            data: {
                status: status,

            }
        });
        res.json(updatedTask);//in response, return json of task

    } catch(error: any) {
        res.status(500).json({message: `Error updating task  ${error.message}`});
        //is sth goes wrong such as db connection fails, this catches the error, set http status code as 500
        //and send back error msg
    }
}
