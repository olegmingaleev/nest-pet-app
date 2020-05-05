import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

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
}
