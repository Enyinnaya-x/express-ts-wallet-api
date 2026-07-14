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
   pgm.sql(`
    INSERT INTO assets (name, price, sell_price) VALUES
    ('Bitcoin', 6300000000000, 6000000000000),
    ('Ethereum', 1800000000000000000000, 1500000000000000000000),
    ('Solana', 77000000000, 70000000000),
    ('USDC', 1000000, 1000000),
    ('USDT', 1000000, 1000000)
`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
