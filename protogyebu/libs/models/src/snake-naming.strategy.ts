import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Table } from 'typeorm/schema-builder/table/Table';
import { NamingStrategyInterface } from 'typeorm';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    tableName(targetName: string, userSpecifiedName: string | undefined): string {
        return userSpecifiedName
            ? userSpecifiedName
            : snakeCase(
                targetName.endsWith('Entity')
                    ? targetName.substring(0, targetName.lastIndexOf('Entity'))
                    : targetName,
            );
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        const name = customName ? customName : snakeCase(propertyName),
            prefix = snakeCase(embeddedPrefixes.join('_'));
        return `${prefix}${name}`;
    }

    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName + '_' + referencedColumnName);
    }

    joinTableName(
        firstTableName: string,
        secondTableName: string,
        firstPropertyName: string,
        secondPropertyName: string,
    ): string {
        return snakeCase(
            firstTableName + '_' + firstPropertyName.replace(/\./gi, '_') + '_' + secondTableName,
        );
    }

    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
        return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
    }

    classTableInheritanceParentColumnName(
        parentTableName: any,
        parentTableIdPropertyName: any,
    ): string {
        return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
    }

    eagerJoinRelationAlias(alias: string, propertyPath: string): string {
        return alias + '__' + propertyPath.replace('.', '_');
    }

    indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
        const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName,
            replacedTableName = tableName.replace('.', '-');
        const keys = ['IDX', replacedTableName, ...columnNames];
        if (where) {
            keys.push(where);
        }
        return snakeCase(keys.join('-'));
    }

    uniqueConstraintName(tableOrName: Table | string, columnNames: string[]): string {
        const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName,
            replacedTableName = tableName.replace('.', '-');
        const keys = ['UQ', replacedTableName, ...columnNames];
        return snakeCase(keys.join('-'));
    }
}