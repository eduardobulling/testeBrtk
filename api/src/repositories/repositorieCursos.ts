import { AppDataSource } from '../data-source'
import { Cursos } from '../entities/Cursos'

export const repositorieCurso = AppDataSource.getRepository(Cursos)