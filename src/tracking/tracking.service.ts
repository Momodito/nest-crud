import { Injectable } from '@nestjs/common';
import { Access } from './entities/access.entity';
import { StatsResponseDto, AccessSummaryDto } from './dto/stats-response.dto';

@Injectable()
export class TrackingService {
    private accesses: Access[] = [];

    trackAccess(username: string): void {
        const access = new Access(username);
        this.accesses.push(access);
        console.log(`Access tracked: ${username} at ${access.timestamp}`);
    }

    getStats(): StatsResponseDto {
        const totalAccesses = this.accesses.length;

        const uniqueUsers = [...new Set(this.accesses.map(access => access.username))];

        const lastAccess = this.accesses.length > 0
            ? this.accesses[this.accesses.length - 1]
            : null;

        const userAccesses = new Map<string, { count: number, lastAccess: Date }>();

        this.accesses.forEach(access => {
            if (!userAccesses.has(access.username)) {
                userAccesses.set(access.username, { count: 0, lastAccess: access.timestamp });
            }
            const userData = userAccesses.get(access.username);
            if (userData) {
                userData.count++;
                if (access.timestamp > userData.lastAccess) {
                    userData.lastAccess = access.timestamp;
                }
            }
        });

        const accesses: AccessSummaryDto[] = Array.from(userAccesses.entries()).map(
            ([username, data]) => ({
                username,
                accessCount: data.count,
                lastAccess: data.lastAccess,
            })
        );

        return {
            totalAccesses,
            uniqueUsers,
            lastAccessUser: lastAccess ? lastAccess.username : 'N/A',
            lastAccessTime: lastAccess ? lastAccess.timestamp: new Date(),
            accesses: accesses.sort((a, b) => b.accessCount - a.accessCount),
        };
    }

    clearAccesses(): void {
        this.accesses = [];
    }
}