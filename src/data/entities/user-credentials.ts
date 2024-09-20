import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserCredentials {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password_hashed: string
}
