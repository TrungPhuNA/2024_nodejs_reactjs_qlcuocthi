import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CompetitionEntity } from "./competition.entity";

@Index('results_pkey', ['id'], { unique: true })
@Entity("results")
export class ResultEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text', {nullable: true} )
	file: string;

	@Column({nullable: true})
	user_id: number;

	@Column({nullable: true})
	competition_id: number;

	@Column({nullable: true, default: 1})
	round_number: number;

	@Column({nullable: true})
	status: string;

	@Column('float', {nullable: true})
	point: number;

	@Column( {nullable: true})
	content: string;

	@Column('longtext', {nullable: true})
	meta_data: any;
	
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

	@ManyToOne(() => User, (d) => d.results)
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;

	@ManyToOne(() => CompetitionEntity, (d) => d.results)
	@JoinColumn([{ name: "competition_id", referencedColumnName: "id" }])
    competition: CompetitionEntity;

	@ManyToMany(() => User)
	@JoinTable({
		name: 'judges',
		joinColumn: { name: 'competition_id', referencedColumnName: 'competition_id' },
		inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
	})
	judges: User[];
}
