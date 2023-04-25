import { QueryRunner } from 'typeorm';

export interface MigrationFunctionInterface {
    (queryRunner: QueryRunner): Promise<void>;
}