import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index('categories_pkey', ['id'], { unique: true })
@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

	@Column()
    type: number;

	@Column()
    slug: string;

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
}
