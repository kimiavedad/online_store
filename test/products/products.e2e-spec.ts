import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../../src/products/products.module';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import * as request from 'supertest';
import { PurchaseProductDto } from 'src/products/dto/purchase-product.dto';

describe('Products - /products (e2e)', () => {
  const product = {
    name: 'The Jungle Book',
    price: 100_000,
    quantity: 5,
  };
  let createdProductId = '';

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3307,
          username: 'root',
          password: 'root',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
        }),
        ProductsModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /products]', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send(product as CreateProductDto)
      .expect(201)
      .then(({ body }) => {
        createdProductId = body.id;
        expect(body.name).toEqual(product.name);
      });
  });

  it('Display [GET /products/:id]', () => {
    return request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.name).toEqual(product.name);
      });
  });

  it('Purchase [POST /products/:id/purchse]', () => {
    const purchaseBody = { quantity: 5 };
    return request(app.getHttpServer())
      .post(`/products/${createdProductId}/purchase`)
      .send(purchaseBody as PurchaseProductDto)
      .expect(200)
      .then(({ body }) => {
        expect(body.quantity).toEqual(product.quantity - purchaseBody.quantity);
      });
  });

  it('Purchase unavailable product', () => {
    const purchaseBody = { quantity: 5 };
    return request(app.getHttpServer())
      .post(`/products/${createdProductId}/purchase`)
      .send(purchaseBody as PurchaseProductDto)
      .expect(404);
  });

  it('Delete [DELETE /products/:id]', () => {
    return request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(200);
  });
});
