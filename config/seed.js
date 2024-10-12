const bcrypt = require("bcryptjs")
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('123456',10)


const userData = [
	{
		firstName: 'Andy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@ggg.mail'
	},
	{
		firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@ggg.mail'
	},
	{
		firstName: 'Candy', lastName: 'Codecamp', password: hashedPassword, email: 'canny@ggg.mail'
	},
	{
		firstName: 'Danny', lastName: 'Codecamp', password: hashedPassword, email: 'dannyy@ggg.mail'
	},
]

const categoryData = [
	{
		name: 'Animal'
	},
	{
		name: 'Business'
	},
	{
		name: 'Sea'
	},
	{
		name: 'Ai/Tech'
	},
	{
		name: 'Activity'
	},
	{
		name: 'Mountain'
	},
	{
		name: 'Holiday'
	},
	{
		name: 'Agriculture'
	},
	{
		name: 'Background'
	},
]

console.log("DB seed....")

async function run() {
    await prisma.user.createMany({
        data: userData
    })
}

async function runCategory(){
	await prisma.category.createMany({
		data: categoryData
	})
}

run()
runCategory()