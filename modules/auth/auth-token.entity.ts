import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'auth', name: 'auth_token' })
export class AuthTokenEntity extends BaseEntity {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true, unique: false })
  public user_id!: string;

  @Column({ type: 'varchar' })
  public token!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public updated_at!: Date;
}
