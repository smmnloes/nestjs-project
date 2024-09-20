import { Module } from '@nestjs/common'
import { datasourceProvider } from './datasource.providers'
import { UserCredentials } from './entities/user-credentials'
import { DataSource, Repository } from 'typeorm'

@Module({
  providers: [datasourceProvider, {
    provide: Repository<UserCredentials>,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserCredentials),
    inject: [DataSource]
  }],
  exports: [Repository<UserCredentials>]
})
export class DatabaseModule {
}
