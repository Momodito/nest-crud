export class StatsResponseDto {
    totalAccesses: number;
    uniqueUsers: string[];
    lastAccessUser: string;
    lastAccessTime: Date;
    accesses: AccessSummaryDto[];
}

export class AccessSummaryDto {
    username: string;
    accessCount: number;
    lastAccess: Date;
}