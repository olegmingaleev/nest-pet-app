import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestoreToken {
  @PrimaryGeneratedColumn('uuid')
  token: string;

  @Column()
  uid: string;

  @Column()
  expiresOn: Date;
}
