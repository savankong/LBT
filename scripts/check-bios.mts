import { getDatabase } from '@netlify/database'
const { sql } = getDatabase()
const rows = await sql`SELECT slug, guest, show_name, guest_bio FROM episodes WHERE status = 'Published' AND guest != 'Savan Kong' ORDER BY show_name, video_number` as any[]
const missing = rows.filter((r: any) => !r.guest_bio)
const has = rows.filter((r: any) => r.guest_bio)
console.log(`\nHAS BIO (${has.length}):`)
has.forEach((r: any) => console.log(`  ✅  ${r.guest} [${r.show_name}]`))
console.log(`\nMISSING BIO (${missing.length}):`)
missing.forEach((r: any) => console.log(`  ❌  ${r.guest} [${r.show_name}] — ${r.slug}`))
