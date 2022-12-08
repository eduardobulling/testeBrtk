import { Request, Response } from "express";

import { repositorieCurso } from '../repositories/repositorieCursos'

export class CursoController{

    async createCurso(req: Request, res: Response) {
		
		const { nome, descricao, vagas, modelo} = req.body

		let valida =  modelo == "online" || modelo == "presencial";

		if (!nome) {
			return res.status(400).json({ message: 'O nome é obrigatório' })
		}
		if (!vagas || vagas <= 0) {
			return res.status(400).json({ message: 'O valor de vagas deve ser maior que 0' })
		}
		if (valida == false) {
			return res.status(400).json({ message: 'Valor incorreto de modelo' })
		}
		try {
			const newCurso = repositorieCurso.create({ nome, descricao, vagas, modelo })

			await repositorieCurso.save(newCurso)

			return res.status(201).json(newCurso)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
  
            
	}

    async listarCurso(req: Request, res: Response) {
		try {
			const resultCurso = await repositorieCurso.find();

			return res.json(resultCurso)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}


}