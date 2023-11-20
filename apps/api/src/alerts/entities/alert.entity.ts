import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity({ name: 'alerts' })
export class Alert extends BaseEntity {
  @Column({ default: '', nullable: false })
  @Index()
  deviceId: string;

  @Column({ default: '', nullable: false })
  @Index()
  alertType: string;

  @Column({ default: '', nullable: false })
  batteryLevel: string;

  @Column({ default: '', nullable: false })
  currentAddress: string;

  @ManyToOne(() => Address, (address) => address.alerts)
  address: Address;
}
