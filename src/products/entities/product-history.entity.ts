import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ProductHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column({ type: 'varchar', length: 255 })
  productName: string;

  @Column('int')
  productPrice: number;

  @Column({ default: 0 })
  productQuantity: number;

  @Column()
  productCreatedAt: Date;

  @Column()
  productUpdatedAt: Date;

  @Column({ nullable: true })
  productDeletedAt: Date | null;

  @Column({ type: 'varchar', length: 255 })
  changeReason: string;

  @CreateDateColumn()
  createdAt: Date;
}
