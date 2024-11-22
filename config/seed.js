const bcrypt = require("bcryptjs")
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('123456',10)


const userData = [
	{
		firstName: 'Paggy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@gmail.com'
	},
	{
		firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@gmail.com'
	},
	{
		firstName: 'Alok', lastName: 'Codecamp', password: hashedPassword, email: 'canny@gmail.com'
	},
	{
		firstName: 'Gunny', lastName: 'Codecamp', password: hashedPassword, email: 'dannyy@gmail.com'
	},
]

const categoryData = [
	{
		name: 'Animal',
		url: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww"
	},
	{
		name: 'Business',
		url: "https://images.unsplash.com/photo-1664575599730-0814817939de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D"

	},
	{
		name: 'Sea',
		url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhfGVufDB8fDB8fHww"
	},
	{
		name: 'Ai/Tech',
		url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
	},
	{
		name: 'Activity',
		url: 'https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	},
	{
		name: 'Mountain',
        url: 'https://images.unsplash.com/photo-1472791108553-c9405341e398?q=80&w=2137&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	},
	{
		name: 'Holiday',
		url: 'https://images.unsplash.com/photo-1451772741724-d20990422508?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fEhvbGlkYXl8ZW58MHx8MHx8fDA%3D'
	},
	{
		name: 'Agriculture',
		url: 'https://images.unsplash.com/photo-1477558716721-e28322f187c6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	},
	{
		name: 'Background',
		url: 'https://images.unsplash.com/photo-1487088678257-3a541e6e3922?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D'
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