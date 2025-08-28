import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //to invoke prisma and grab data from db

//new fcn, exporting this so it can be called in router.get(), fcn takes req and res as arguments 
export const getProjects = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const projects = await prisma.project.findMany(); //inside prisma, grab project schema (see schema.prisma)
        res.json(projects);//in response, return json of project

    } catch(error: any) {
        res.status(500).json({message: `Error retrieving projects  ${error.message}`});
        //is sth goes wrong such as db connection fails, this catches the error, set http status code as 500
        //and send back error msg
    }
}

export const createProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { name, description, startDate, endDate } = req.body; //extract data from request

    try {
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }, //create and insert new row of data inside the Project table
        });
        res.status(201).json(newProject); //sends response back with 201 status code and json of new data

    } catch(error: any) {
        res.status(500).json({message: `Error creating projects: ${error.message}`});

    }
}


