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

const bettingsTable: MigrationFunctionInterface = async (queryRunner: QueryRunner) => {
    const tableName = 'bettings',
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
                    { name: 'users_id', type: 'int' },
                    { name: 'status', type: 'boolean', default: false },
                    { name: 'betting_amount', type: 'int' },
                    { name: 'drainage', type: 'float' },
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
            new TableIndex({ columnNames: ['users_id'] }),
            new TableIndex({ columnNames: ['is_deleted'] })
        ])
    }
}
migrationFunctions.set('bettingsTable', bettingsTable)

// const usersRelationBettingsTable: MigrationFunctionInterface = async (queryRunner: QueryRunner) => {
//     const tableName = 'bettings';
//     const table = await queryRunner.getTable(tableName);
//     if (table) {
//         const columns = table.columns;
//         if (!columns.find((column) => column.name === 'users_id')) {
//             await queryRunner.query(
//                 `ALTER TABLE \`bettings\` ADD COLUMN \`users_id\` int(10)  DEFAULT NULL NULL, ADD INDEX \`idx-users_id\` (\`users_id\`), ALGORITHM=INPLACE`,
//             );
//         } else {
//             console.log('users_id가 존재합니다.');
//         }
//     } else {
//         console.log(`${tableName}이 존재하지 않습니다.`);
//     }
// };
// migrationFunctions.set('usersRelationBettingsTable', usersRelationBettingsTable)

const gamesTable: MigrationFunctionInterface = async (queryRunner: QueryRunner) => {
    const tableName = 'games',
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
                    { name: 'bettings_id', type: 'int' },
                    { name: 'game_id', type: 'int' },
                    { name: 'betting_type', type: 'varchar' },
                    { name: 'betting_score', type: 'int' },
                    { name: 'result', type: 'boolean', isNullable: true },
                ]
            })
        )

        await queryRunner.createIndices(tableName, [
            new TableIndex({ columnNames: ['id'] }),
            new TableIndex({ columnNames: ['uid'] }),
            new TableIndex({ columnNames: ['bettings_id'] }),
            new TableIndex({ columnNames: ['game_id'] }),
        ])
    }
}
migrationFunctions.set('gamesTable', gamesTable)
