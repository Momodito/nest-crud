import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
    @UseGuards(JwtAuthGuard)
    @Get('dashboard')
    getDashboard(@Request() req) {
        return {
            message: `Bienvenido ${req.user.name} (${req.user.role})!`,
            user: req.user,
            dashboardData: {
                stats: { users: 15, orders: 42, revenue: 12500 },
                timestamp: new Date().toISOString(),
            }
        };
    }
}