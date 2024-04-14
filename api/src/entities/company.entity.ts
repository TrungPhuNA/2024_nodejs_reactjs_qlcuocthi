import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Jobs } from "./job.entity";
import { User } from "./user.entity";

@Index('companies_pkey', ['id'], { unique: true })
@Entity("companies")
export class Company {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	slug: string;

	// @Column()
	// hash_slug: string;

	@Column()
	email: string;

	@Column()
	logo: string;

	@Column()
	address: string;

	@Column()
	phone: string;

	@Column()
	website: string;

	@Column()
	content: string;

	@Column()
	status: number;

	@Column()
	user_id: number;


	@Column()
	scale: number;

	@Column()
	working_time: number;

	@Column()
	careers: string;
	
	@Column('timestamp', {
		name: 'created_at',
		default: () => 'now()',
	})
	created_at: Date;

	@Column('timestamp', {
		name: 'updated_at',
		nullable: true,
		default: () => 'now()',
	})
	updated_at: Date;

	@OneToMany(() => Jobs, o => o.company)
	@JoinColumn([{ name: "id", referencedColumnName: "company_id" }])
	jobs: Jobs[];

	@OneToOne(() => User, user=> user.company)
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;


}
