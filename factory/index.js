const faker = require('faker')

const user = () => {
  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    isPro: false,
    role: faker.random.arrayElement(['user', 'admin']),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
}

const post = (userId) => {
  return {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(20, '\n'),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    userId
  }
}

const comment = () => {}

module.exports = {
  user, post, comment
}
