import { ActivityEvent } from '../types';

export const RECENT_ACTIVITY: ActivityEvent[] = [
  {
    id: 'act-1',
    type: 'added',
    title: 'Telangana State Teacher Eligibility Test (TG-TET) 2026 notification detected',
    timestamp: '2026-05-14T05:35:00Z',
    targetId: 'tg-tet-2026-active'
  },
  {
    id: 'act-2',
    type: 'updated',
    title: 'TGPSC Group-I Services Recruitment details clarified',
    timestamp: '2026-05-14T05:10:00Z',
    targetId: 'tgpsc-group1-2026-active'
  },
  {
    id: 'act-3',
    type: 'verified',
    title: 'UPSC CAPF 2026 official notification source link verified',
    timestamp: '2026-05-14T04:45:00Z',
    targetId: 'upsc-capf-2026-active'
  },
  {
    id: 'act-4',
    type: 'expired',
    title: 'SSC Constable (GD) application period concluded',
    timestamp: '2026-05-14T02:00:00Z',
    targetId: 'ssc-gd-2026-expired'
  }
];
