import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResultEntity } from "./result.entity";
import { User } from "./user.entity";
import { CriteriaEntity } from "./criterias.entity";
import { SchoolEntity } from "./school.entity";

@Index('competitions_pkey', ['id'], { unique: true })
@Entity("competitions")
export class CompetitionEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', {nullable: false , length: 191})
	name: string;

	@Column('text', {nullable: true })
	contents: string;

	@Column({nullable: true })
	author_id: number;

	@Column({nullable: true })
	school_id: number;

	@Column({nullable: true })
	status: number;

	@Column('varchar', {nullable: true , length: 255})
	image: string;

	@Column('timestamp', {
		name: 'deadline',
		nullable: true
	})
	deadline: Date;

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

	@OneToMany(() => ResultEntity, o => o.competition)
	@JoinColumn([{ name: "id", referencedColumnName: "competition_id" }])
	results: ResultEntity[];

	@ManyToOne(() => User, (d) => d.competitions)
	@JoinColumn([{ name: "author_id", referencedColumnName: "id" }])
    author: User;

	@ManyToOne(() => SchoolEntity, (d) => d.competitions)
	@JoinColumn([{ name: "school_id", referencedColumnName: "id" }])
    school: SchoolEntity;

	@ManyToMany(() => CriteriaEntity)
	@JoinTable({
		name: 'competitions_criterias',
		joinColumn: { name: 'competition_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'criterias_id', referencedColumnName: 'id' },
	})
	criterias?: CriteriaEntity[];


	@ManyToMany(() => User)
	@JoinTable({
		name: 'judges',
		joinColumn: { name: 'competition_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
	})
	judges: User[];

	
}
