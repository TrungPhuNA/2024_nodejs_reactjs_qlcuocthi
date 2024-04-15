import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SchoolEntity } from "./school.entity";

@Index('class_pkey', ['id'], { unique: true })
@Entity("class")
export class ClassEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	school_id: number;

	@Column({ nullable: true })
	unit: string;

	@Column('varchar', {nullable: false , length: 191})
	name: string;

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

	@ManyToOne(() => SchoolEntity, (d) => d.classrooms)
	@JoinColumn([{ name: "school_id", referencedColumnName: "id" }])
    school: SchoolEntity;
}
