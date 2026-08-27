import postgres from 'postgres'

// Lazy: DigitalOcean only resolves ${lbt-db.DATABASE_URL}-style bindings at
// container run time, not during `next build`. Constructing the client eagerly
// at module scope would parse that unresolved literal string during Next's
// build-time page-data collection and crash. Deferring construction to first
// real query sidesteps that entirely.
type Sql = ReturnType<typeof postgres>

let _sql: Sql | undefined

function client(): Sql {
  if (!_sql) _sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })
  return _sql
}

export const sql: Sql = new Proxy((() => {}) as unknown as Sql, {
  apply(_target, thisArg, args) {
    return Reflect.apply(client() as unknown as (...a: unknown[]) => unknown, thisArg, args)
  },
  get(_target, prop) {
    return Reflect.get(client() as unknown as object, prop)
  },
})
