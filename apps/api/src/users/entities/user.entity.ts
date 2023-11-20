import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
