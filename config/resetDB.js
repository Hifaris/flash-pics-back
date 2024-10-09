require('dotenv').config()
const prisma = require("./prisma")

async function run() {
    await prisma.$executeRawUnsafe('DROP DATABASE Flash_pics')
    await prisma.$executeRawUnsafe('CREATE DATABASE Flash_pics')
}

console.log('Reset DB...')
run()