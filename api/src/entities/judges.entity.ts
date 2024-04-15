import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Index('judges_pkey', ['id'], { unique: true })
@Entity("judges")
export class JudgeEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: true, default: 0 })
	user_id: number;

	@Column({nullable: true, default: 0 })
	competition_id: number;
	
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
