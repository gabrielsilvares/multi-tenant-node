import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Subscriber } from "./Subscriber";

@Entity("contact", { schema: "public" })
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "phone" })
  phone: string;

  @Column("character varying", { name: "office" })
  office: string;

  @Column("character varying", { name: "birthday" })
  birthday: string;

  @ManyToOne(() => Client, (client) => client.contacts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Client;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.contacts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sub_id", referencedColumnName: "id" }])
  subscriber: Subscriber;
}
