import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export type UserRolesType = 'host' | 'admin' | 'user';

@Entity()
export class User {
  @PrimaryColumn({
    unique: true
  })
  email: string;
  @PrimaryColumn() password: string;

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({
    unique: true
  })
  username: string;

  @Column({
    default: 'user'
  })
  roles: string;
}
