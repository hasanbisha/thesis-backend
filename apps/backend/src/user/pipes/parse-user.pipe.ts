import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class ParseUserPipe implements PipeTransform {
  constructor(
    private userService: UserService,
  ) {}

  async transform(id: number, metadata: ArgumentMetadata) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
