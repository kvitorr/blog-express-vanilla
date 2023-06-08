import { Request, Response, NextFunction } from "express";
import UserRepository from "../repository/UserRepository";
import { sign } from "jsonwebtoken"


class AuthService {

    getToken = async (email: string, senha: string) => {
        const user = await UserRepository.getAuthenticatedUser(email, senha)

        if(!user) {
            throw new Error('Email ou senha inválida')
        }

        const tokenData = {
            name: user.nome,
            email: user.email
        }

        const tokenKey = "123456789";

        const tokenOptions = {
            subject: user.cod_usuario
        }

        const token = sign(tokenData, tokenKey, tokenOptions)
        return token
    }




}

export default new AuthService()