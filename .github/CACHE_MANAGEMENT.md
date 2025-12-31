# GitHub Actions Cache Management

## Current Status
- Cache limit: 10 GB
- Current usage: ~6.15 GB (61.5%)
- Remaining: ~3.85 GB

## Automatic Eviction
GitHub automatically evicts unused caches after 7 days of inactivity. This is handled automatically and requires no action.

## Manual Cleanup
If cache usage approaches 90%+ (>9 GB), manually clean up old caches:

```bash
# List all caches
gh cache list --limit 100

# Delete caches older than 3 days (if needed)
gh cache list --limit 100 | grep "2025-12-2[0-9]" | awk '{print $1}' | while read cache_id; do gh cache delete $cache_id; done
```

## Monitoring
- Check cache usage in GitHub Settings > Actions > Caches
- Monitor when usage exceeds 80% (>8 GB)
- Consider cleanup when usage exceeds 90% (>9 GB)

## Best Practices
1. Let GitHub handle automatic eviction (7 days)
2. Only manual cleanup if usage exceeds 90%
3. Keep recent caches for better CI performance
4. Review cache usage monthly

Last cleanup: 2025-12-31 (reduced from 9.23 GB to 6.15 GB)
