const tableName = 'lines'

export function up (knex) {
  return knex
    .schema
    .withSchema('returns')
    .createTable(tableName, (table) => {
      // Primary Key
      table.string('line_id').primary()

      // Data
      table.string('version_id').notNullable()
      table.string('substance').notNullable()
      table.decimal('quantity').notNullable()
      table.string('unit').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.string('time_period').notNullable()
      table.jsonb('metadata')
      table.string('reading_type')
      table.string('user_unit')

      table.unique(['version_id', 'substance', 'start_date', 'end_date'], { useConstraint: true })

      // Legacy timestamps
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')
    })
}

export function down (knex) {
  return knex
    .schema
    .withSchema('returns')
    .dropTableIfExists(tableName)
}
