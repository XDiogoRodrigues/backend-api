import { z } from "zod";

const passwordField = z.string().min(8, "Precisa conter no mínimo 8 caracteres")
.max(12,"Pode conter no máximo 12 caracteres.")
.regex(/[A-Z]/, "Precisa conter uma letra maiúscula.")
.regex(/[0-9]/, "Precisa conter 1 número.")
.regex(/[!@#$%&*-]/, "Precisa conter um caractere especial: !@#$%&*-")

export const userCreate = z.object({
    name: z.string().min(3, "O nome precisa conter no mínimo 3 caracteres.")
    .max(20, "O nome precisa conter no máximo 20 caracteres."),

    surname: z.string().min(3, "O sobrenome precisa conter no mínimo 3 caracteres.")
    .max(20, "O sobrenome precisa conter no máximo 20 caracteres."),

    email: z.string().email("E-mail inválido!"),

    password: passwordField,
    
    confirmPassword: z.string({required_error: "A confirmação de senha é obrigatória!"}).min(1, "A confirmação de senha é obrigatória.")

}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"]
})

export type UserCreate = z.infer< typeof userCreate>;