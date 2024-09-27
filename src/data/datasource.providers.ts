import { DataSource } from 'typeorm'
import { User } from './entities/user'
import { Provider } from '@nestjs/common'

export const datasourceProvider: Provider =
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'mydatabase',
        entities: [ User ],
        synchronize: true
      })

      return dataSource.initialize()
    }
  }
