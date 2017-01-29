import Promise = require('bluebird');
import events = require('events');

declare module 'pg' {

    type Value = string | number | boolean | Date;
    type ColumnName = string | Raw | QueryBuilder;

    interface KnexFactory {
        (config: Config): Knex;
    }

    interface Knex extends QueryInterface {
        (tableName?: string): QueryBuilder;
        VERSION: string;
        __knex__: string;

        raw: RawBuilder;
        transaction: <R>(transactionScope: ((trx: Transaction) => void)) => Promise<any>;
        destroy(callback: Function): void;
        destroy(): Promise<void>;

        schema: SchemaBuilder;

        client: any;
        migrate: MigrationAPI;
        seed: any;
        fn: any;
    }

    //
    // QueryInterface
    //

    interface QueryInterface {
        select: Select;
        as: As;
        columns: Select;
        column: Select;
        from: Table;
        into: Table;
        table: Table;
        distinct: Distinct;

        // Joins
        join: Join;
        joinRaw: JoinRaw;
        innerJoin: Join;
        leftJoin: Join;
        leftOuterJoin: Join;
        rightJoin: Join;
        rightOuterJoin: Join;
        outerJoin: Join;
        fullOuterJoin: Join;
        crossJoin: Join;

        // Wheres
        where: Where;
        andWhere: Where;
        orWhere: Where;
        whereNot: Where;
        whereRaw: WhereRaw;
        whereWrapped: WhereWrapped;
        havingWrapped: WhereWrapped;
        orWhereRaw: WhereRaw;
        whereExists: WhereExists;
        orWhereExists: WhereExists;
        whereNotExists: WhereExists;
        orWhereNotExists: WhereExists;
        whereIn: WhereIn;
        orWhereIn: WhereIn;
        whereNotIn: WhereIn;
        orWhereNotIn: WhereIn;
        whereNull: WhereNull;
        orWhereNull: WhereNull;
        whereNotNull: WhereNull;
        orWhereNotNull: WhereNull;
        whereBetween: WhereBetween;
        whereNotBetween: WhereBetween;
        orWhereBetween: WhereBetween;
        orWhereNotBetween: WhereBetween;

        // Group by
        groupBy: GroupBy;
        groupByRaw: RawQueryBuilder;

        // Order by
        orderBy: OrderBy;
        orderByRaw: RawQueryBuilder;

        // Union
        union: Union;
        unionAll(callback: Function): QueryBuilder;

        // Having
        having: Having;
        havingRaw: RawQueryBuilder;
        orHaving: Having;
        orHavingRaw: RawQueryBuilder;

        // Paging
        offset(offset: number): QueryBuilder;
        limit(limit: number): QueryBuilder;

        // Aggregation
        count(columnName?: string): QueryBuilder;
        min(columnName: string): QueryBuilder;
        max(columnName: string): QueryBuilder;
        sum(columnName: string): QueryBuilder;
        avg(columnName: string): QueryBuilder;
        increment(columnName: string, amount?: number): QueryBuilder;
        decrement(columnName: string, amount?: number): QueryBuilder;

        // Others
        first(...columns: string[]): QueryBuilder;

        debug(enabled?: boolean): QueryBuilder;
        pluck(column: string): QueryBuilder;

        insert(data: any, returning?: string | string[]): QueryBuilder;
        update(data: any, returning?: string | string[]): QueryBuilder;
        update(columnName: string, value: Value, returning?: string | string[]): QueryBuilder;
        returning(column: string): QueryBuilder;

        del(returning?: string | string[]): QueryBuilder;
        delete(returning?: string | string[]): QueryBuilder;
        truncate(): QueryBuilder;

        transacting(trx: Transaction): QueryBuilder;
        connection(connection: any): QueryBuilder;

        clone(): QueryBuilder;
    }

    interface As {
        (columnName: string): QueryBuilder;
    }

    interface Select extends ColumnNameQueryBuilder {
    }

    interface Table {
        (tableName: string): QueryBuilder;
        (callback: Function): QueryBuilder;
    }

    interface Distinct extends ColumnNameQueryBuilder {
    }

    interface Join {
        (raw: Raw): QueryBuilder;
        (tableName: string, callback: Function): QueryBuilder;
        (tableName: string, column1: string, column2: string): QueryBuilder;
        (tableName: string, column1: string, raw: Raw): QueryBuilder;
        (tableName: string, column1: string, operator: string, column2: string): QueryBuilder;
    }

    interface JoinRaw {
        (tableName: string, binding?: Value): QueryBuilder;
    }

    interface Where extends WhereRaw, WhereWrapped, WhereNull {
        (object: Object): QueryBuilder;
        (columnName: string, value: Value): QueryBuilder;
        (columnName: string, operator: string, value: Value | Value[]): QueryBuilder;
        (columnName: string, operator: string, query: QueryBuilder): QueryBuilder;
    }

    interface WhereRaw extends RawQueryBuilder {
        (condition: boolean): QueryBuilder;
    }

    interface WhereWrapped {
        (callback: Function): QueryBuilder;
    }

    interface WhereNull {
        (columnName: string): QueryBuilder;
    }

    interface WhereIn {
        (columnName: string, values: Value[]): QueryBuilder;
        (columnName: string, callback: Function): QueryBuilder;
        (columnName: string, query: QueryBuilder): QueryBuilder;
    }

    interface WhereBetween {
        (columnName: string, range: [Value, Value]): QueryBuilder;
    }

    interface WhereExists {
        (callback: Function): QueryBuilder;
        (query: QueryBuilder): QueryBuilder;
    }

    interface WhereNull {
        (columnName: string): QueryBuilder;
    }

    interface WhereIn {
        (columnName: string, values: Value[]): QueryBuilder;
    }

    interface GroupBy extends RawQueryBuilder, ColumnNameQueryBuilder {
    }

    interface OrderBy {
        (columnName: string, direction?: string): QueryBuilder;
    }

    interface Union {
        (callback: Function, wrap?: boolean): QueryBuilder;
        (callbacks: Function[], wrap?: boolean): QueryBuilder;
        (...callbacks: Function[]): QueryBuilder;
        // (...callbacks: Function[], wrap?: boolean): QueryInterface;
    }

    interface Having extends RawQueryBuilder, WhereWrapped {
        (tableName: string, column1: string, operator: string, column2: string): QueryBuilder;
    }

    // commons

    interface ColumnNameQueryBuilder {
        (...columnNames: ColumnName[]): QueryBuilder;
        (columnNames: ColumnName[]): QueryBuilder;
    }

    interface RawQueryBuilder {
        (sql: string, ...bindings: Value[]): QueryBuilder;
        (sql: string, bindings: Value[]): QueryBuilder;
        (raw: Raw): QueryBuilder;
    }

    // Raw

    interface Raw extends events.EventEmitter, ChainableInterface {
        on(event: string, cb: (data: any) => any): this;
        wrap(before: string, after: string): Raw;
    }

    interface RawBuilder {
        (value: Value): Raw;
        (sql: string, ...bindings: Value[]): Raw;
        (sql: string, bindings: Value[]): Raw;
    }

    //
    // QueryBuilder
    //

    interface QueryBuilder extends QueryInterface, ChainableInterface {
        or: QueryBuilder;
        and: QueryBuilder;

        //TODO: Promise?
        columnInfo(column?: string): Promise<ColumnInfo>;

        forUpdate(): QueryBuilder;
        forShare(): QueryBuilder;

        toSQL(): Sql;

        on(event: string, callback: Function): QueryBuilder;
    }

    interface Sql {
        method: string;
        options: any;
        bindings: Value[];
        sql: string;
    }

    //
    // Chainable interface
    //

    interface ChainableInterface extends Promise<any> {
        toQuery(): string;
        options(options: any): QueryBuilder;
        stream(options?: any, callback?: (builder: QueryBuilder) => any): QueryBuilder;
        stream(callback?: (builder: QueryBuilder) => any): QueryBuilder;
        pipe(writable: any): QueryBuilder;
        exec(callback: Function): QueryBuilder;
    }

    interface Transaction extends QueryBuilder {
        raw: RawQueryBuilder;
        commit: any;
        rollback: any;
    }

    //
    // Schema builder
    //

    interface SchemaBuilder {
        withSchema(schemaName?: string): SchemaBuilder;
        createTable(tableName: string, callback: (tableBuilder: CreateTableBuilder) => any): Promise<void>;
        createTableIfNotExists(tableName: string, callback: (tableBuilder: TableBuilder) => any): Promise<void>;
        renameTable(oldTableName: string, newTableName: string): Promise<void>;
        dropTable(tableName: string): Promise<void>;
        hasTable(tableName: string): Promise<boolean>;
        hasColumn(tableName: string, columnName: string): Promise<boolean>;
        table(tableName: string, callback: (tableBuilder: AlterTableBuilder) => any): Promise<void>;
        dropTableIfExists(tableName: string): Promise<void>;
        raw(statement: string): SchemaBuilder;
    }

    interface TableBuilder {
        increments(columnName?: string): ColumnBuilder;
        dropColumn(columnName: string): TableBuilder;
        dropColumns(...columnNames: string[]): TableBuilder;
        renameColumn(from: string, to: string): ColumnBuilder;
        integer(columnName: string): ColumnBuilder;
        bigInteger(columnName: string): ColumnBuilder;
        text(columnName: string, textType?: string): ColumnBuilder;
        string(columnName: string, length?: number): ColumnBuilder;
        float(columnName: string, precision?: number, scale?: number): ColumnBuilder;
        decimal(columnName: string, precision?: number, scale?: number): ColumnBuilder;
        boolean(columnName: string): ColumnBuilder;
        date(columnName: string): ColumnBuilder;
        dateTime(columnName: string): ColumnBuilder;
        time(columnName: string): ColumnBuilder;
        timestamp(columnName: string): ColumnBuilder;
        timestamps(): ColumnBuilder;
        binary(columnName: string): ColumnBuilder;
        enum(columnName: string, values: Value[]): ColumnBuilder;
        enu(columnName: string, values: Value[]): ColumnBuilder;
        json(columnName: string, jsonb?: boolean): ColumnBuilder;
        uuid(columnName: string): ColumnBuilder;
        comment(val: string): TableBuilder;
        specificType(columnName: string, type: string): ColumnBuilder;
        primary(columnNames: string[]): TableBuilder;
        index(columnNames: string[], indexName?: string, indexType?: string): TableBuilder;
        dropIndex(columns, indexName?: string);
        unique(columnNames: string[], indexName?: string): TableBuilder;
        foreign(column: string): ColumnBuilder;
        dropForeign(columns: string, foreignKeyName?: string);
    }

    interface CreateTableBuilder extends TableBuilder {
    }

    interface MySqlTableBuilder extends CreateTableBuilder {
        engine(val: string): CreateTableBuilder;
        charset(val: string): CreateTableBuilder;
        collate(val: string): CreateTableBuilder;
    }

    interface AlterTableBuilder extends TableBuilder {
    }

    interface MySqlAlterTableBuilder extends AlterTableBuilder {
    }

    interface ColumnBuilder {
        index(indexName?: string, indexType?: string): ColumnBuilder;
        primary(): ColumnBuilder;
        unique(): ColumnBuilder;
        references(columnName: string): ReferencingColumnBuilder;
        inTable(table: string);
        onDelete(command: string): ColumnBuilder;
        onUpdate(command: string): ColumnBuilder;
        defaultTo(value: Value | Raw): ColumnBuilder;
        unsigned(): ColumnBuilder;
        notNullable(): ColumnBuilder;
        nullable(): ColumnBuilder;
        first(): ColumnBuilder;
        after(field: string): ColumnBuilder;
        comment(value: string): ColumnBuilder;
    }

    interface PostgreSqlColumnBuilder extends ColumnBuilder {
        index(indexName?: string, indexType?: string): ColumnBuilder;
    }

    interface ReferencingColumnBuilder {
        inTable(tableName: string): ColumnBuilder;
    }

    interface AlterColumnBuilder extends ColumnBuilder {
    }

    interface MySqlAlterColumnBuilder extends AlterColumnBuilder {
        first(): AlterColumnBuilder;
        after(columnName: string): AlterColumnBuilder;
    }

    //
    // Migrations
    //
    interface MigrationAPI {
        make(name: string, config?: MigrationConfig): any;
        latest(config?: MigrationConfig): Promise<any>;
        rollback(config?: MigrationConfig): Promise<any>;
        currentVersion(config?: MigrationConfig): Promise<any>;
    }

    //
    // Configurations
    //
    interface ColumnInfo {
        defaultValue: Value;
        type: string;
        maxLength: number;
        nullable: boolean;
    }

    interface Config {
        debug?: boolean;
        client?: string;
        dialect?: string;
        connection: ConnectionConfig | Sqlite3ConnectionConfig | SocketConnectionConfig | string;
        pool?: PoolConfig;
        migrations?: MigrationConfig;
    }

    interface ConnectionConfig {
        host: string;
        user: string;
        password: string;
        database: string;
        debug?: boolean;
    }

    /** Used with SQLite3 adapter */
    interface Sqlite3ConnectionConfig {
        filename: string;
        debug?: boolean;
    }

    interface SocketConnectionConfig {
        socketPath: string;
        user: string;
        password: string;
        database: string;
        debug?: boolean;
    }

    interface PoolConfig {
        name?: string;
        create?: Function;
        afterCreate?: Function;
        destroy?: Function;
        beforeDestroy?: Function;
        min?: number;
        max?: number;
        refreshIdle?: boolean;
        idleTimeoutMillis?: number;
        reapIntervalMillis?: number;
        returnToHead?: boolean;
        priorityRange?: number;
        validate?: Function;
        log?: boolean;
    }

    interface MigrationConfig {
        database?: string;
        directory: string;
        extension?: string;
        tableName?: string;
    }
}

import * as PG from 'knex'
declare var PG: PG.KnexFactory;
