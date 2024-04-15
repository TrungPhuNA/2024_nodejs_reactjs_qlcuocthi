import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SchoolEntity } from "./school.entity";
import { ResultEntity } from "./result.entity";
import { ManyToMany } from "typeorm";
import { CompetitionEntity } from "./competition.entity";
import { JoinTable } from "typeorm";

@Index('users_pkey', ['id'], { unique: true })
@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', {nullable: false , length: 191})
	name: string;

	@Column('varchar', {nullable: false , length: 191})
	email: string;

	@Column('varchar', {nullable: true , length: 191 })
	username: string;

	@Column('varchar', {nullable: true , length: 255})
	avatar: string;

	@Column('varchar', {nullable: true , length: 20})
	code: string;

	@Column('text', {nullable: true })
	address: string;

	@Column('varchar', {nullable: true, length: 191 })
	phone: string;

	@Column('varchar', {nullable: true, length: 191,  })
	type: string;

	@Column('varchar', {nullable: false, length: 255 })
	password: string;

	@Column('smallint', { name: 'status', nullable: true, default: 1 })
	status: number;
	
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

	@OneToMany(() => SchoolEntity, o => o.user)
	@JoinColumn([{ name: "id", referencedColumnName: "rector_id" }])
	schools: SchoolEntity[];

	@OneToMany(() => CompetitionEntity, o => o.author)
	@JoinColumn([{ name: "id", referencedColumnName: "author_id" }])
	competitions: CompetitionEntity[];

	@OneToMany(() => ResultEntity, o => o.user)
	@JoinColumn([{ name: "id", referencedColumnName: "user_id" }])
	results: ResultEntity[];

	@ManyToMany(() => CompetitionEntity)
	@JoinTable({
		name: 'judges',
		joinColumn: { name: 'user_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'competition_id', referencedColumnName: 'id' },
	})
	judge_competitions: CompetitionEntity[];
}
