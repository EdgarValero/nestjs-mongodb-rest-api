import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProduct(productId: string): Promise<Product> {
    return await this.productModel.findById(productId);
  }
  
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async deleteProduct(productId: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(productId);
  }
  
  async updateProduct(productId: string, createProductDto: CreateProductDto): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(productId, createProductDto, { new: true });
  }
}
