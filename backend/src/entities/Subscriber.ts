import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Client } from "./Client";
import { Contact } from "./Contact";
import { Prospection } from "./Prospection";
import { User } from "./User";

@Index("UQ_073600148a22d05dcf81d119a6a", ["email"], { unique: true })
@Index("UQ_3c8c200034cbb441b5784b66da5", ["userId"], { unique: true })
@Entity("subscriber", { schema: "public" })
export class Subscriber {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("character varying", { name: "email", unique: true })
  email: string;

  @Column("integer", { name: "plan", default: () => "1" })
  plan: number;

  @OneToMany(() => Client, (client) => client.subscriber)
  clients: Client[];

  @OneToMany(() => Contact, (contact) => contact.subscriber)
  contacts: Contact[];

  @OneToMany(() => Prospection, (prospection) => prospection.subscriber, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'prospection_id' })
  prospections: Prospection[];

  @OneToOne(() => User, (user) => user.subscriber, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
