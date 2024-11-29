import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../create-product.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { ProductHistory } from "src/products/entities/product-history.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(ProductHistory)
        private productHistoryRepository: Repository<ProductHistory>,

        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: CreateProductCommand): Promise<any> {
        console.log("*******************create product command")
        const { name, price, quantity } = command;
        const product = this.productRepository.create({ name, price, quantity });
        // TODO:  await this.recordProductHistory(createdProduct, 'CREATED');
        return await this.productRepository.save(product);
    }
}
