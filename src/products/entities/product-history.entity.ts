import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductHistory {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Product)
    product: Product

    @Column({ type: 'varchar', length: 255 })
    productName: string;
  
    @Column('int')
    productPrice: number;
  
    @Column({ type: 'int', default: 0 })
    productQuantity: number;

    @Column()
    productCreatedAt: Date;
  
    @Column()
    productUpdatedAt: Date;
  
    @Column()
    productDeletedAt: Date;

    @Column({ type: 'varchar', length: 255 })
    changeReason: string;

    @CreateDateColumn()
    createdAt: Date;
}