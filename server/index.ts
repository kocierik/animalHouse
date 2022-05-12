import * as http from 'http'
import { connect } from 'mongoose'

//TEST
import User from './entities/User'

const hostname = '127.0.0.1';
const port = 8080;

	
async function main() {
  await connect('mongodb://AnimalHouse:animal@127.0.0.1:27017/animal-house-db');

  const user = new User ({
    username: "mattia",
    password: "mattia",
    email: "matt@ti.a",
    firstName: "mattia",
    lastName: "mattia",
    phone: "1234567"
  })

  await user.save()
  
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

main().catch(err => console.log(err));
