import { faker } from '@faker-js/faker'

export function generateUserCredentials() {
  return {
    userName: faker.internet.email(({ firstName: 'Jea'})),
    password: 'P@ssw0rd1',
  }
}
