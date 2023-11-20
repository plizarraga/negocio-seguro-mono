import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity({ name: 'buttons' })
export class Button extends BaseEntity {
  @Column({ default: '', nullable: false })
  @Index({ unique: true })
  code: string;

  @ManyToOne(() => Address, (address) => address.buttons)
  address: Address;
}
