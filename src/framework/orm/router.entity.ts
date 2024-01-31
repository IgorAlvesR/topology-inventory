import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'routers' })
export class Router {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  model: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  ip: string;

  @Column({ nullable: false, type: 'decimal' })
  numberOfPorts: number;

  @Column({ nullable: false, type: 'decimal' })
  latitude: number;

  @Column({ nullable: false, type: 'decimal' })
  longitude: number;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  type: string;

  /*  @OneToMany(
    () => RouterConnection,
    (routerConnection) => routerConnection.router,
  )
  routersConnection: RouterConnection[]; */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
