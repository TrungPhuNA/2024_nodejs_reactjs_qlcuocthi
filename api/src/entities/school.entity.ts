import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClassEntity } from "./classEntity.entity";
import { User } from "./user.entity";

@Index('schools_pkey', ['id'], { unique: true })
@Entity("schools")
export class SchoolEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', {nullable: false , length: 191})
	name: string;

	@Column({nullable: true})
	rector_id: number;

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

	@OneToMany(() => ClassEntity, o => o.school)
	@JoinColumn([{ name: "id", referencedColumnName: "school_id" }])
	classrooms: ClassEntity[];

	@ManyToOne(() => User, (d) => d.schools)
	@JoinColumn([{ name: "rector_id", referencedColumnName: "id" }])
    user: User;
}
