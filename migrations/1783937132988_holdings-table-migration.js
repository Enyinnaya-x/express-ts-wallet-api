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
    pgm.createTable('holdings', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        user_id: {
            type: 'bigint',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE'
        },
        asset_id: {
            type: 'bigint',
            notNull: true,
            references: 'assets',
            onDelete: 'CASCADE'
        },
        quantity: {
            type: 'bigint',
            default: 0,
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
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
