import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { User } from "src/entities/user.entity";
import { IPaging } from "src/helpers/interface/common.interface";
import { Company } from "src/entities";

export class CompanyRepository extends Repository<Company>{


	constructor(
		@InjectRepository(Company)
		private repository: Repository<Company>,
	) {
		super(
			repository.target,
			repository.manager,
			repository.queryRunner,
		);
	}

	
	async findById(id: number) {
		return await this.findOne({
			where: {
				id: id
			},
		});
	}
}
