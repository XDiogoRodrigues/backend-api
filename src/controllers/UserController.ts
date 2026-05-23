import { type Request, type Response } from "express";

import bcrypt from "bcrypt";

import { z } from "zod";

import { userCreate } from "../schemas/user.create.js";

import { addUser, getUserByEmail } from "../repositories/UserRepository.js";

class UserController {

    static async createUser(req: Request, res: Response) {
        try {
            const data = userCreate.parse(req.body)

            const user = await getUserByEmail(data.email)

            if(user) {
                return res.status(409).json({message: "E-mail já está cadastrado!"})
            }

            const hashPassword = await bcrypt.hash(data.password, 10)

            const userDataToSave = {
                ...data,
                password: hashPassword
            }

            await addUser(userDataToSave)

            return res.status(201).json({message: "Usuário criado com sucesso!"})

        } catch(err: any) {
            if(err instanceof z.ZodError){
                return res.status(400).json({
                    errors: err.issues.map((issue) => ({
                        path: issue.path[0],
                        message: issue.message
                    }))
                })
            }

            console.error("Erro interno: ", err)

            return res.status(500).json({message: `Houve um erro no servidor: ${err}`})

        }

    }
}

export default UserController;