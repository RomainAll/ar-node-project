'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('mail').notNull().unique().alter();
        });
    },

    async down(knex) {
        await knex.schema.alterTable('user', (table) => {

            table.string('mail').notNull().alter();
        });
    }
};
