import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { User } from '../../users/entities/user.entity';
import { Button } from '../../buttons/entities/button.entity';
import { Alert } from '../..//alerts/entities/alert.entity';

@Entity({ name: 'addresses' })
export class Address extends BaseEntity {
  @Column({ default: '', nullable: false })
  street: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @OneToMany(() => Button, (button) => button.address)
  buttons: Button[];

  @OneToMany(() => Alert, (alert) => alert.address)
  alerts: Alert[];
}
