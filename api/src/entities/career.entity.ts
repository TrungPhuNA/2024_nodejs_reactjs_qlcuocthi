import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Jobs } from "./job.entity";

@Index('careers_pkey', ['id'], { unique: true })
@Entity("careers")
export class Career {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

	@Column()
    hot: number;

	@Column()
    total_jobs: number;

	@Column()
    status: number;

    @Column()
    avatar: string;

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

	@ManyToMany(type => Company)
	@JoinTable({
		name: 'company_careers',
		joinColumn: { name: 'career_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'company_id', referencedColumnName: 'id' },
	})
	companies: Company[];

	@OneToMany(() => Jobs, o => o.career)
	@JoinColumn([{ name: "id", referencedColumnName: "career_id" }])
	jobs: Jobs[];
}
