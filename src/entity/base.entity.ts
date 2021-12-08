import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      nullable: true,
      default: false,
    })
    isActive?: boolean;
  
    @Column({ nullable: true, select: false })
    createdBy?: string;
  
    @Column({ nullable: true, select: false })
    updatedBy?: string;
  
    @Column({ nullable: true, select: false })
    deletedBy?: string;
  
    @CreateDateColumn({ select: true })
    createdAt?: Date;
  
    @UpdateDateColumn({ select: true })
    updatedAt?: Date;
  
    @DeleteDateColumn({ select: false })
    deletedAt?: Date;
  }
  