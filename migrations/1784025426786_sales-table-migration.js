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
    pgm.createTable('sales', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        user_id: {
            type: 'bigint',
            references: 'users',
            notNull: true,
            onDelete: 'CASCADE'
        },
        assets_id: {
            type: 'bigint',
            references: 'assets',
            notNull: true,
            onDelete: 'CASCADE'
        },
        sell_price_snapshot: {
            type: 'bigint',
            notNull: true
        },
        payout: {
            type: 'bigint',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        update_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
