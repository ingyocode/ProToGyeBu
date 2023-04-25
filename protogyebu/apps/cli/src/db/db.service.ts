import { Command, Console, createSpinner } from 'nestjs-console';
import { Connection, QueryRunner, Table } from "typeorm";
import { migrationFunctions } from './migration-history';

@Console({
    command: 'db',
    description: 'DB migration'
})
export class DbService {
    queryRunner: QueryRunner;
    migrationTableName = 'migrations';
    constructor(private connection: Connection) {
        this.queryRunner = this.connection.createQueryRunner()
    }

    @Command({
        command: 'init',
        description: 'DB Migration History Table',
    })
    async init(): Promise<void> {
        const spinner = createSpinner();
        spinner.start();
        spinner.info('migration table 확인');

        const hasMigrationTable = await this.hasMigrationTable();

        if (!hasMigrationTable) {
            spinner.info('migration 테이블 없음 생성 시작');
            await this.queryRunner.createTable(
                new Table({
                    name: this.migrationTableName,
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        { name: 'timestamp', type: 'bigint', isNullable: false },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '255',
                            isNullable: false,
                        },
                    ],
                }),
            );
            spinner.succeed('생성완료');
        } else {
            spinner.succeed('migration 테이블이 이미 존재합니다.');
        }
    }

    @Command({
        command: 'run',
    })
    async run(): Promise<void> {
        const spinner = createSpinner();
        spinner.start();
        spinner.info('migration table 확인');

        const hasMigrationTable = await this.hasMigrationTable();
        if (!hasMigrationTable) {
            spinner.fail(
                `${this.migrationTableName} 테이블이 없습니다. migration init을 실행하세요`
            );
            return;
        }
        spinner.info('마이그레이션 시작!!');
        for (const migrationFunction of migrationFunctions) {
            const functionName = migrationFunction[0];
            const func = migrationFunction[1].bind(this);

            if (!(await this.alreadyRanFunction(functionName))) {
                spinner.info(`${functionName} 시작`);
                try {
                    await func(this.queryRunner);
                } catch (e) {
                    const error = e as Error;
                    spinner.fail(error.message);
                    spinner.fail(error.stack);
                    return;
                }

                const insertQuery = `INSERT INTO ${this.migrationTableName
                    }(timestamp, name) VALUES (${Date.now()}, '${functionName}')`;

                await this.queryRunner.query(insertQuery);
                spinner.info(`${functionName} 완료`);
            }
        }
        spinner.succeed('마이그레이션 완료');
    }

    private async hasMigrationTable() {
        return this.queryRunner.hasTable(this.migrationTableName);
    }

    private async alreadyRanFunction(name: string) {
        const alreadyRun: [] = await this.queryRunner.query(
            `SELECT * from ${this.migrationTableName} where name='${name}'`,
        );
        return alreadyRun.length > 0;
    }
}

