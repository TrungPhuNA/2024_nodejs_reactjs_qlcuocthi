import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Company } from "./company.entity";
import { UserJob } from "./user-job.entity";
import { Career } from "./career.entity";

@Index('jobs_pkey', ['id'], { unique: true })
@Entity("jobs")
export class Jobs {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	avatar: string;

	@Column()
	content: string;

	@Column()
	description: string;

	@Column()
	career_id: number;

	@Column()
	tags: string;

	@Column()
	type: number;

	@Column()
	form_of_work_id: number;

	@Column()
	address: string;

	@Column()
	number: number;

	@Column()
	user_id: number;

	@Column()
	company_id: number;

	@Column()
	experience_id: number;

	@Column()
	rank_id: number;

	@Column()
	salary: number;

	@Column()
	salary_id: number;

	@Column()
	status: number;

	@Column('date', {
		name: 'deadline',
		default: () => 'now()',
	})
	deadline: Date;
	
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

	@ManyToOne(() => User, (user) => user.jobs)
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;

	@ManyToOne(() => Career, (user) => user.jobs)
	@JoinColumn([{ name: "career_id", referencedColumnName: "id" }])
    career: Career;

	@ManyToOne(() => Company, (user) => user.jobs)
	@JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
    company: Company;

	@OneToMany(() => UserJob, o => o.user)
	@JoinColumn([{ name: "id", referencedColumnName: "job_id" }])
	user_jobs: UserJob[];
}
