// a = [
// 	{
// 		id:1
// 	},
// 	{
// 		id:2
// 	}
// ]

// index = a.findIndex(p => p.id == 1)
// a[1].name = 'banner'

// console.log(a)


// const knex = require('knex')({
//   client: 'mysql2',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     password: 'banner',
//     database: 'miniShop'
//   },
//   pool: { min: 0, max: 7 }
// })

// const createUserTables = () => {
//   knex.schema
//     .createTableIfNotExists('users',table => {
//       table.increments('userId').primary().notNullable()
//       table.string('name').notNullable()
//       table.string('emailId').notNullable()
//       table.timestamp('created_at').defaultTo(knex.fn.now())
//       table.timestamp('updated_at').defaultTo(knex.fn.now())
//       // table.dropForeign("productId");
//       table.integer('productId')
//       table.foreign('productId').references('products.id').onDelete('CASCADE').onUpdate('CASCADE')
//       })
//       .then(() => {
//         console.log('user table created...')
//       })
//       .catch((err) => {
//         console.log(err)
//       })
// }

// createUserTables()

a = []

console.log(a.length)










