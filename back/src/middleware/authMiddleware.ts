import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from "../utils/api-errors"
import UsuarioRepository from '../repository/UsuarioRepository'

import jwt, { JwtPayload } from 'jsonwebtoken'

export const authMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { authorization } = request.headers

	if (!authorization) {
		throw new UnauthorizedError('Não autorizado')
	}

	const token = authorization.split(' ')[1]

	const { email } = jwt.verify(token, process.env.SECRET_KEY ?? '') as JwtPayload

	const user = await UsuarioRepository.getUsuarioByEmail(email)

	if (!user) {
		throw new UnauthorizedError('Não autorizado')
	}

	const { senha: _, ...loggedUser } = user

	request.usuario = loggedUser

	next()
}