import { Controller, Delete, Get, Post, Put, Body, Res, Param, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';

@Controller('api/products')
export class ProductController {

  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(@Res() res): Promise<Product[]> {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:id')
  async getProduct(@Param('id') productId, @Res() res): Promise<Product> {
    const product = await this.productService.getProduct(productId)
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto, @Res() res): Promise<Product> {
    const product = await this.productService.createProduct(createProductDto);
    return res.json({
      msg: 'Product Created Successfully',
      product
    });
  }

  @Delete()
  async deleteProduct(@Query('id') productId, @Res() res): Promise<Product> {
    const deletedProduct = await this.productService.deleteProduct(productId);
    if (!deletedProduct) throw new NotFoundException('Product does not exist!');
    return res.json({
      msg: 'Product Deleted Successfully',
      deletedProduct
    });
  }

  @Put(':id')
  async updateProduct(@Param('id') productId, @Body() createProductDto: CreateProductDto, @Res() res): Promise<Product> {
    const updatedProduct = await this.productService.updateProduct(productId, createProductDto);
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return res.json({
      msg: 'Product Updated Successfully',
      updatedProduct
    });
  }
}
