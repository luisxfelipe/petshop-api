import { PickType } from "@nestjs/swagger";
import { CreateCustomerDto } from "./create-customer.dto";

export class UpdateCustomerDto extends PickType(CreateCustomerDto, ['name'] as const) {}