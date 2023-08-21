import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CurrentUser } from '../auth/auth.guard';
import { User } from '../user/entities/user.entity';
import { ParseUserPipe } from '../user/pipes/parse-user.pipe';

@Controller('timesheets')
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Get()
  getTimesheets(
    @CurrentUser() user: User,
    @Query("from", ParseIntPipe) from: number,
    @Query("to", ParseIntPipe) to: number,
  ) {
    return this.timesheetsService.findAll(user, from, to);
  }

  @Get("/overall")
  getOverall(
    @CurrentUser() user: User,
    @Query("from", ParseIntPipe) from: number,
    @Query("to", ParseIntPipe) to: number,
  ) {
    return this.timesheetsService.getMyOverall(user, from, to);
  }

  @Get("/team")
  getTeam(
    @CurrentUser() user: User,
    @Query("from", ParseIntPipe) from: number,
    @Query("to", ParseIntPipe) to: number,
  ) {
    return this.timesheetsService.getTeam(user, from, to);
  }

  @Get("/team/overall")
  getTeamOverall(
    @CurrentUser() user: User,
    @Query("from", ParseIntPipe) from: number,
    @Query("to", ParseIntPipe) to: number,
  ) {
    return this.timesheetsService.getTeamOverall(user, from, to);
  }

  @Get("/team/:user")
  getTeamMemberTimesheets(
    @Param("user", ParseUserPipe) user: User,
    @Query("from", ParseIntPipe) from: number,
    @Query("to", ParseIntPipe) to: number,
  ) {
    return this.timesheetsService.findAll(user, from, to);
  }
}
