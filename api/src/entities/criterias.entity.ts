import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompetitionEntity } from "./competition.entity";

@Index('criterias_pkey', ['id'], { unique: true })
@Entity("criterias")
export class CriteriaEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', {nullable: false , length: 191})
	name: string;

	@Column('text', {nullable: true })
	contents: string;

	@Column({nullable: true })
	author_id: number;

	@Column('varchar', {nullable: true , length: 255})
	image: string;
	
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

	@ManyToMany(() => CompetitionEntity)
	@JoinTable({
		name: 'competitions_criterias',
		joinColumn: { name: 'criterias_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'competition_id', referencedColumnName: 'id' },
	})
	competitions?: CompetitionEntity[];
}
