import { DataSource } from 'typeorm'
import { UserCredentials } from './entities/user-credentials'
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
        entities: [UserCredentials],
        synchronize: true
      })

      return dataSource.initialize()
    }
  }
