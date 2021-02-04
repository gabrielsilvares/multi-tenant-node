import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createContacts1605278693294 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'contact',
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
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'email',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'phone',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'office',
					type: 'varchar'
				},
				{
					name: 'birthday',
					type: 'varchar'
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
					name: 'ContactSubscriber',
					columnNames: ['subscriber_id'],
					referencedTableName: 'subscriber',
					referencedColumnNames: ['id'],
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				},
				{
					name: 'ClientContact',
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
		await queryRunner.dropTable('contact')
	}

}
