import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Client } from "./Client";
import { Subscriber } from "./Subscriber";

@Entity("prospection", { schema: "public" })
export class Prospection {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("integer", { name: "status" })
  status: number;

  @Column("text", { name: "talked" })
  talked: string;

  @Column("timestamp with time zone", { name: "date" })
  date: Date;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => Client, (client) => client.prospections, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Client;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.prospections, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "subscriber_id", referencedColumnName: "id" }])
  subscriber: Subscriber;
}
