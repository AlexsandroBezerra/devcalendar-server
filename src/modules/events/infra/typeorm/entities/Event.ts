import { Transform } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { convertMinutesToTime } from '@shared/utils/convertMinutesToTime'

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description?: string

  @Column()
  date: Date

  @Column()
  @Transform(value => (value ? convertMinutesToTime(value) : null))
  from?: number

  @Column()
  @Transform(value => (value ? convertMinutesToTime(value) : null))
  to?: number

  @Column({ name: 'user_id' })
  userId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default Event
