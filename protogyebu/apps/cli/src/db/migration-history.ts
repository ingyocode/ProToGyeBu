import { QueryRunner, Table, TableIndex } from "typeorm";
import { MigrationFunctionInterface } from "./interfaces";

export const migrationFunctions = new Map<string, any>();

const usersTable: MigrationFunctionInterface = async (queryRunner: QueryRunner) => {
    const tableName = 'users',
        hasTalbe = await queryRunner.hasTable(tableName);
    if (hasTalbe) {
        console.log(`이미 ${tableName}이 존재합니다.`)
    } else {
        console.log(`${tableName}를 만들기 시작합니다`)
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    {
                        name: 'uid',
                        type: 'varchar',
                        length: '32',
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '50',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'enc_key',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    { name: 'is_deleted', type: 'boolean', default: false },
                    { name: 'created_at', type: 'date', default: 'CURRENT_TIMESTAMP' },
                    {
                        name: 'updated_at',
                        type: 'date',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ]
            })
        )

        await queryRunner.createIndices(tableName, [
            new TableIndex({ columnNames: ['id'] }),
            new TableIndex({ columnNames: ['uid'] }),
            new TableIndex({ columnNames: ['is_deleted'] })
        ])
    }
}
migrationFunctions.set('usersTable', usersTable)