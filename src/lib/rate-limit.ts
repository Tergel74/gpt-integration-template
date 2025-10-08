// Rate limiting storage (in production, use Redis or proper storage)
interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute

export function rateLimit(identifier: string): {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
} {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    if (!entry || now > entry.resetTime) {
        // Reset or create new entry
        const resetTime = now + RATE_LIMIT_WINDOW;
        rateLimitStore.set(identifier, { count: 1, resetTime });
        return {
            success: true,
            limit: RATE_LIMIT_MAX_REQUESTS,
            remaining: RATE_LIMIT_MAX_REQUESTS - 1,
            reset: resetTime,
        };
    }

    if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
        return {
            success: false,
            limit: RATE_LIMIT_MAX_REQUESTS,
            remaining: 0,
            reset: entry.resetTime,
        };
    }

    entry.count++;
    return {
        success: true,
        limit: RATE_LIMIT_MAX_REQUESTS,
        remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
        reset: entry.resetTime,
    };
}

// Clean up expired entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}, RATE_LIMIT_WINDOW);
