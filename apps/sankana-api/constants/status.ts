/**
 * In case we found some problems with this one,
 * we can enlarge the numbers here like http statuses
 *
 * For example, if `started` got some different variants
 * we can scale the `1` to `10` to `100` to `1000` and so on
 */
export const Status = {
  Pending: 0,
  Started: 1,
  InProgress: 2,
  Completed: 3,
  Cancelled: 4,
} as const;
