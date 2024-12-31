import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'permissions' })
@Unique(['name'])
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name', type: 'varchar', length: 150 })
  public name: string;

  @Column({ name: 'description', type: 'varchar' })
  public description: string;

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  users: UserEntity[];

  @Column({ name: 'active', type: 'boolean', default: true })
  public active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}
