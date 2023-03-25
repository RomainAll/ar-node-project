'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('role').notNull().defaultTo('user');
        });
    },

    async down(knex) {

        await knex.dropColumn('role');
    }
};
