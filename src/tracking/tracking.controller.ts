import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TrackingService } from './tracking.service';
import { StatsResponseDto } from './dto/stats-response.dto';

interface ResponseObject {
    message: string;
    timestamp?: string;
}
@Controller()
export class TrackingController {
    constructor(private readonly trackingService: TrackingService) { }

    @UseGuards(JwtAuthGuard)
    @Get('track')
    trackAccess(@Request() req): { message: string } {
        const username = req.user.name;

        this.trackingService.trackAccess(username);

        return {
            message: `Access tracked for user: ${username}`,
            timestamp: new Date().toISOString()
        } as ResponseObject;
    }

    @Get('stats')
    getStats(): StatsResponseDto {
        return this.trackingService.getStats();
    }

    @Get('stats/clear')
    clearStats(): { message: string } {
        this.trackingService.clearAccesses();
        return { message: 'Statistics cleared successfully' };
    }
}