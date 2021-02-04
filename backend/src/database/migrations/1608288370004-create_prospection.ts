import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProspection1608288370004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'prospection',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'subscriber_id',
            type: 'uuid'
          },
          {
            name: 'client_id',
            type: 'uuid'
          },
          {
            name: 'status',
            type: 'integer'
          },
          {
            name: 'talk',
            type: 'text',
          },
          {
            name: 'date',
            type: 'timestamp with time zone'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'ProspectionSubscriber',
            columnNames: ['subscriber_id'],
            referencedTableName: 'subscriber',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          {
            name: 'ProspectionClient',
            columnNames: ['client_id'],
            referencedTableName: 'client',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		  await queryRunner.dropTable('prospection')
    }

}
