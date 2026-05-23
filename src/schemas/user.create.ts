import { z } from "zod";

export const userCreate = z.object({
    name: z.string({required_error: "O nome é obrigatório!"}).min(3, "O nome precisa conter no mínimo 3 caracteres.")
    .max(20, "O nome precisa conter no máximo 20 caracteres."),

    surname: z.string({required_error: "O sobrenome é obrigtório!"}).min(3, "O sobrenome precisa conter no mínimo 3 caracteres.")
    .max(20, "O sobrenome precisa conter no máximo 20 caracteres."),

    email: z.string({required_error: "O e-mail é obrigatório!"}).email(),

    password: z.string({required_error: "A senha é obrigtório!"}).min(8, "Precisa conter no mínimo 8 caracteres")
    .max(12,"Pode conter no máximo 12 caracteres.")
    .regex(/[A-Z]/, "Precisa conter uma letra maiúscula.")
    .regex(/[0-9]/, "Precisa conter 1 número.")
    .regex(/[!@#$%&*-]/, "Precisa conter um caractere especial: !@#$%&*-"),

    confirmPassword: z.string({required_error: "A confirmação de senha é obrigatória!"}).min(1, "A confirmação de senha é obrigatória.")

}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"]
})

export type UserCreate = z.infer< typeof userCreate>;