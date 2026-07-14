
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('purchases', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        idempotency_key: {
            type: 'varchar(255)',
            unique: true,
            notNull: true
        },
        asset_id: {
            type: 'bigint',
            references: 'assets',
            onDelete: 'CASCADE',
            notNull: true
        },
        user_id:{
            type: 'bigint',
            references: 'users',
            onDelete: 'CASCADE',
            notNull: true
        },
        buy_price: {
            type: 'bigint',
            notNull: true
        },
        asset_price_snapshot: {
            type: 'bigint',
            notNull: true
        },
         created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
