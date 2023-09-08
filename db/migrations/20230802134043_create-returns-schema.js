export function up (knex) {
  return knex.raw(`
    CREATE SCHEMA IF NOT EXISTS "returns";
  `)
}

export function down (knex) {
  return knex.raw(`
    DROP SCHEMA IF EXISTS "returns";
  `)
}
