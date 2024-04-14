import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/helpers/helper";
import { ProductService } from "src/service/product.service";

@Controller('v1/fe/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    @Get('/')
    async getListsProducts(@Req() request: Request) {
        try{
            const paging = {
                page: request.query.page || 1,
                page_size: request.query.page_size || 10,
            }

            const filters = {
                hot : request.query.hot || null,
                status : request.query.status || null,
            }

            const response = await this.productService.getLists(paging, filters);
            return BaseResponse('success', response, '', 'Successful');
        }catch (e ){
            console.log('ProductController@getListsProducts -------------> ', e.message);
            return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
        }
    }

    @Get(':id')
    async findById(@Req() request: Request, id: number) {
        try{
            const response = await this.productService.findById(id);
            return BaseResponse('success', response, '', 'Successful');
        }catch (e ){
            console.log('ProductController@findById -------------> ', e.message);
            return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
        }
    }
}
