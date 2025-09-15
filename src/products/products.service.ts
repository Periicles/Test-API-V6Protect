import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as randomUUID } from 'uuid';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { Product } from './products';

@Injectable()
export class ProductsService {
  private readonly DATA_PATH: string;

  public constructor() {
    this.DATA_PATH = path.join(process.cwd(), 'data', 'products.json');
  }

  private async readAll(): Promise<Array<Product>> {
    const jsonRaw: string = await fs.readFile(this.DATA_PATH, 'utf8');
    const items: Array<Product> = JSON.parse(jsonRaw) as Array<Product>;
    return items;
  }

  private async writeAll(items: Array<Product>): Promise<void> {
    const json: string = JSON.stringify(items, null, 4);
    await fs.writeFile(this.DATA_PATH, json, 'utf8');
  }

  public getAllProductsAsync = async (): Promise<Array<Product>> => {
    const items: Array<Product> = await this.readAll();
    console.log('Returning', items.length, 'products');
    return items;
  };

  public getOneAsync = async (id: string): Promise<Product> => {
    const items: Array<Product> = await this.readAll();
    const found: Product | undefined = items.find(
      (p: Product): boolean => p.id === id,
    );
    if (!found) {
      throw new NotFoundException('Product not found');
    }
    console.log('Found product', found);
    return found;
  };

  public createProductAsync = async (
    payload: Omit<Product, 'id'>,
  ): Promise<Product> => {
    const items: Array<Product> = await this.readAll();
    const created: Product = {
      id: randomUUID(),
      name: payload.name,
      description: payload.description,
      price: payload.price,
      availableQuantity: payload.availableQuantity,
    };
    items.unshift(created);
    await this.writeAll(items);
    console.log('Created product', created);
    return created;
  };

  public removeProductAsync = async (id: string): Promise<void> => {
    const items: Array<Product> = await this.readAll();
    const idx: number = items.findIndex((p: Product): boolean => p.id === id);
    if (idx === -1) {
      throw new NotFoundException('Product not found');
    }
    items.splice(idx, 1);
    await this.writeAll(items);
    console.log('Removed product', id);
  };
}
