import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Password } from '../../shared/static/password/password.service';

export type UserRolesType = 'host' | 'admin' | 'user';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    select: false,
    transformer: {
      to: pass => Password.hash(pass),
      from: pass => pass
    }
  })
  password: string;

  @Column({
    unique: true
  })
  username: string;

  @Column({
    default: 'user'
  })
  roles: string;

  @Column({
    default: false
  })
  disabled: boolean;
}
