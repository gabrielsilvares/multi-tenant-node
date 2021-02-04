import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createClients1605278577900 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'client',
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
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'description',
					type: 'varchar'
				},
				{
					name: 'latitude',
					type: 'numeric',
					precision: 10,
					scale: 7
				},
				{
					name: 'longitude',
					type: 'numeric',
					precision: 10,
					scale: 7
				},
				{
					name: 'state',
					type: 'varchar'
				},
				{
					name: 'city',
					type: 'varchar'
				},
				{
					name: 'cep',
					type: 'varchar'
				},
				{
					name: 'region',
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
					name: 'ClientSubscriber',
					columnNames: ['subscriber_id'],
					referencedTableName: 'subscriber',
					referencedColumnNames: ['id'],
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('client')
	}

}