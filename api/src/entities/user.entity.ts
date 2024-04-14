import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Jobs } from "./job.entity";
import { UserJob } from "./user-job.entity";
import { Company } from "./company.entity";

@Index('users_pkey', ['id'], { unique: true })
@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	avatar: string;

	@Column()
	address: string;

	@Column()
	phone: string;

	@Column()
	gender: string;

	@Column()
	password: string;

	@Column('smallint', { name: 'status', nullable: true, default: 1 })
	status: number;

	@Column('smallint', { name: 'type', nullable: true, default: 1 })
	type: number;

	@Column('timestamp', {
		name: 'dob',
		default: () => 'now()',
	})
	dob: Date;
	
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


	@OneToMany(() => Jobs, o => o.user)
	@JoinColumn([{ name: "id", referencedColumnName: "user_id" }])
	jobs: Jobs[];

	@OneToMany(() => UserJob, o => o.user)
	@JoinColumn([{ name: "id", referencedColumnName: "user_id" }])
	user_jobs: UserJob[];

	@OneToOne(() => Company, company => company.user)
	@JoinColumn([{ name: 'id', referencedColumnName: 'user_id' }])
	company: Company;
}
