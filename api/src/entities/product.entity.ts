import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index('products_pkey', ['id'], { unique: true })
@Entity("products")
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    description: string;

    @Column()
    avatar: string;

    @Column('smallint', { name: 'status', nullable: true, default: 1 })
    status: number;

    @Column('smallint', { name: 'hot', nullable: true, default: 1 })
    hot: number;

    @Column('smallint', { name: 'is_wholesale', nullable: true, default: null })
    is_wholesale: number;

    @Column('bigint', { name: 'category_id', nullable: true, default: 0 })
    category_id: number;

    @Column('bigint', { name: 'total_stars', nullable: true, default: 0 })
    total_stars: number;

    @Column('bigint', { name: 'total_vote', nullable: true, default: 0 })
    total_vote: number;

    @Column('bigint', { name: 'ward_id', nullable: true, default: 0 })
    ward_id: number;

    @Column('bigint', { name: 'district_id', nullable: true, default: 0 })
    district_id: number;

    @Column('bigint', { name: 'province_id', nullable: true, default: 0 })
    province_id: number;

    @Column('bigint', { name: 'price', nullable: true, default: 0 })
    price: number;

    @Column('bigint', { name: 'number', nullable: true, default: 0 })
    number: number;

    @Column('bigint', { name: 'count_buy', nullable: true, default: 0 })
    count_buy: number;

    @Column('bigint', { name: 'sale', nullable: true, default: 0 })
    sale: number;

    @Column('bigint', { name: 'user_id', nullable: true, default: 0 })
    user_id: number;

    @Column('text', { name: 'user_id', nullable: true, default: null })
    content: string;

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
