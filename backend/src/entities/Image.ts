import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Client } from "./Client";

@Entity("image", { schema: "public" })
export class Image {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "path" })
  path: string;

  @ManyToOne(() => Client, (client) => client.images, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Client;
}
