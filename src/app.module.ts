import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductHistory } from './products/entities/product-history.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'online_store',
      entities: [Product, ProductHistory],
      synchronize: true,
      // shouldn't be used in production
      // TODO: create an env file and set up these items from there
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
