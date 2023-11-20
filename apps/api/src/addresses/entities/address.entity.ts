import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'addresses' })
export class Address extends BaseEntity {
  @Column({ default: '', nullable: false })
  street: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
