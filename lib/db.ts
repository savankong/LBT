import { Pool, type QueryResultRow } from 'pg'

let _pool: Pool | null = null

function getPool(): Pool {
  if (!_pool) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set')
    }
    _pool = new Pool({ connectionString })
  }
  return _pool
}

/** Tagged-template query helper, e.g. `await sql\`SELECT * FROM episodes WHERE slug = ${slug}\`` */
export async function sql<T extends QueryResultRow = QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  const text = strings.reduce((acc, str, i) => acc + (i > 0 ? `$${i}` : '') + str, '')
  const result = await getPool().query<T>(text, values)
  return result.rows
}
