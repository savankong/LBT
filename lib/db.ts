import { getDatabase } from '@netlify/database'

type DbSql = ReturnType<typeof getDatabase>['sql']

let _sql: DbSql | null = null

function getSql(): DbSql {
  if (!_sql) _sql = getDatabase().sql
  return _sql
}

export const sql: DbSql = ((...args: Parameters<DbSql>) => getSql()(...args)) as DbSql
