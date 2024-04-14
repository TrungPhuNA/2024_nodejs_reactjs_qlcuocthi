import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Jobs } from "./job.entity";
import { User } from "./user.entity";

@Index('user_jobs_pkey', ['id'], { unique: true })
@Entity("user_jobs")
export class UserJob {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    job_id: number;

	@Column()
    file: string;

	@Column()
    status: number;

    @Column()
    message: string;

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

	@ManyToOne(() => Jobs, (user) => user.user_jobs)
	@JoinColumn([{ name: "job_id", referencedColumnName: "id" }])
    job: Jobs;

	@ManyToOne(() => User, (user) => user.user_jobs)
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;
}
