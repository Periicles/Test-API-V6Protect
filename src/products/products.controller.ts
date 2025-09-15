import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from './products';

@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getAllProducts(): Promise<Array<Product>> {
    return await this.productsService.getAllProductsAsync();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getOneAsync(id);
  }

  @Post()
  public async createProduct(
    @Body() body: Omit<Product, 'id'>,
  ): Promise<Product> {
    return await this.productsService.createProductAsync(body);
  }

  @Delete(':id')
  public async removeProduct(
    @Param('id') id: string,
  ): Promise<{ success: true }> {
    await this.productsService.removeProductAsync(id);
    return { success: true };
  }
}
