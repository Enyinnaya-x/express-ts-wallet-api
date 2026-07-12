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
    pgm.createTable('wallets', {
        id:{
            type: 'serial',
            primaryKey: true,
        },
        user_id:{
            type: 'integer',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE',
        },
        balance:{
            type: 'bigint',
            notNull: true,
            default: 0,
        },
        created_at:{
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at:{
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
export const down = (pgm) => {
    pgm.dropTable('wallets');
};
