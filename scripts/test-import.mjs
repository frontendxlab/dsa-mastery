import { DatabaseSync } from 'node:sqlite'
import { BOOKS } from '../src/data/books.ts'
console.log('Loaded', BOOKS.length, 'books from TS')
for (const b of BOOKS) {
  const total = b.chapters.reduce((s, c) => s + c.problems.length, 0)
  console.log(' ', b.slug, b.title, '-', total, 'problems in', b.chapters.length, 'chapters')
}
const db = new DatabaseSync(':memory:')
db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)')
console.log('node:sqlite works too')
