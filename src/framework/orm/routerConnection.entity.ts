import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'routers-connection' })
export class RouterConnection {
  @PrimaryGeneratedColumn()
  id: number;

  /* @ManyToOne(() => Router, (router) => router.routersConnection)
  router: Router; */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
