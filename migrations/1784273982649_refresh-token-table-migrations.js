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
    pgm.createTable('refresh_tokens', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        user_id: {
            type: 'bigint',
            references: 'users',
            onDelete: 'CASCADE',
            notNull: true
        },
        token: {
            type: 'varchar(255)',
            notNull: true
        },
        expires_at: {
            type: 'timestamp',
            notNull: true,
        },
        revoked: {
            type: 'boolean',
            notNull: true,
            default: false
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP')
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
     pgm.dropTable('refresh_tokens');
};
