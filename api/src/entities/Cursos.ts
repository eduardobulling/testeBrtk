import {
	Column,
	Entity,	
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Cursos {
	@PrimaryGeneratedColumn()
	id: number 

	@Column({
       length: 180,
    })
    nome: string

    @Column({ type: 'text' })
	descricao: string


    @Column({
        type: 'integer'
    })
    vagas: number

    @Column({ type: 'text' })
	modelo: string

}