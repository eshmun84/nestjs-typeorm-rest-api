import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'users' })
@Index(['firstName'])
@Index(['lastName'])
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 150 })
  public firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 150 })
  public lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 150 })
  public email: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  public password: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 25 })
  public phoneNumber: string;

  @Column({ name: 'address', type: 'varchar' })
  public address: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.users)
  @JoinTable({
    name: 'user_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}
