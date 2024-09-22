import { DataSource } from 'typeorm'
import { User } from './entities/user'
import { Provider } from '@nestjs/common'

export const datasourceProvider: Provider =
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'myuser',
        password: 'mypassword',
        database: 'mydatabase',
        entities: [User],
        synchronize: true
      })

      return dataSource.initialize()
    }
  }
