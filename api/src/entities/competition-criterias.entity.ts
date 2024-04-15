import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Index('competitions_criterias_pkey', ['id'], { unique: true })
@Entity("competitions_criterias")
export class CompetitionCriteriasEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	competition_id: number;

	@Column({ nullable: true })
	criterias_id: number;


	@Column('timestamp', {
		name: 'created_at',
		nullable: true,
		default: () => 'now()',
	})
	created_at: Date;

	@Column('timestamp', {
		name: 'updated_at',
		nullable: true,
		default: () => 'now()',
	})
	updated_at: Date;
}
