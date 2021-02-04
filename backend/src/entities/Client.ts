import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subscriber } from "./Subscriber";
import { Contact } from "./Contact";
import { Image } from "./Image";
import { Prospection } from "./Prospection";

@Entity("client", { schema: "public" })
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "description" })
  description: string;

  @Column("numeric", { name: "latitude", precision: 10, scale: 7 })
  latitude: number;

  @Column("numeric", { name: "longitude", precision: 10, scale: 7 })
  longitude: number;

  @Column("character varying", { name: "state" })
  state: string;

  @Column("character varying", { name: "city" })
  city: string;

  @Column("character varying", { name: "cep" })
  cep: string;

  @Column("character varying", { name: "region" })
  region: string;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.clients, {
    cascade: ['insert', 'update', 'remove']
  })
  @JoinColumn([{ name: "sub_id", referencedColumnName: "id" }])
  subscriber: Subscriber;

  @OneToMany(() => Contact, (contact) => contact.client, {
    cascade: ['insert', 'update']
  })
  contacts: Contact[];

  @OneToMany(() => Image, (image) => image.client, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'client_id' })
  images: Image[];

  @OneToMany(() => Prospection, (prospection) => prospection.client, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'prospection_id' })
  prospections: Prospection[];
}
