import prisma from "../db/conn.js";

import { type UserCreate } from "../schemas/user.create.js";

export function getUserByEmail(email: string) {

    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export function addUser(user: UserCreate) {

    return prisma.user.create({
        data: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,

            profile: {
                create: {}
            }
        }

    })

}