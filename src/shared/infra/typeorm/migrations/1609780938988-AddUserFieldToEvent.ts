import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export class AddUserFieldToEvent1609780938988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'user_id',
        type: 'uuid'
      })
    )

    await queryRunner.createForeignKey(
      'events',
      new TableForeignKey({
        name: 'EventName',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('events', '')

    await queryRunner.dropColumn('events', 'user_id')
  }
}
