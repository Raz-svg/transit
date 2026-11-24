import type { PlanResponse, StandStatus } from '@transit/shared-types';

/**
 * Contract-shaped fixtures so web, map and driver-portal work can start before
 * OTP and the GTFS feed exist. Delete once the real services land.
 */
export const mockPlan: PlanResponse = {
  itineraries: [
    {
      id: 'mock-kg-ccm-1',
      durationSeconds: 840,
      walkTimeSeconds: 240,
      transitTimeSeconds: 600,
      estimatedFare: { currency: 'INR', amount: 20 },
      congestionLevel: 'moderate',
      legs: [
        {
          mode: 'WALK',
          from: { name: 'Kashmere Gate Metro', lat: 28.6675, lng: 77.2282 },
          to: { name: 'Kashmere Gate Auto Stand', lat: 28.6662, lng: 77.2296 },
          durationSeconds: 150,
          distanceMeters: 200,
          geometryPolyline: '{b~mDgsjvMvB_DjCwB',
        },
        {
          mode: 'AUTO_RICKSHAW',
          routeShortName: 'KG-1 Kashmere Gate - Chandni Chowk',
          routeColor: '#FF8800',
          from: { name: 'Kashmere Gate Auto Stand', lat: 28.6662, lng: 77.2296 },
          to: { name: 'Chandni Chowk Stand', lat: 28.656, lng: 77.231 },
          durationSeconds: 600,
          distanceMeters: 1150,
          frequencyMinutes: { min: 3, max: 5 },
          geometryPolyline: 'wz}mD_|jvM~RwBzToAzToA',
        },
        {
          mode: 'WALK',
          from: { name: 'Chandni Chowk Stand', lat: 28.656, lng: 77.231 },
          to: { name: 'Chandni Chowk Market', lat: 28.6555, lng: 77.23 },
          durationSeconds: 90,
          distanceMeters: 110,
          geometryPolyline: '_{{mDwdkvMbBfE',
        },
      ],
    },
  ],
};

export const mockStands: StandStatus[] = [
  {
    standId: 'kg-auto-1',
    name: 'Kashmere Gate Auto Stand',
    coordinates: [77.2296, 28.6662],
    availableVehiclesEstimate: 5,
    passengerQueueLevel: 'normal',
    averageWaitMinutes: 4,
    lastUpdated: '2026-12-01T09:00:00+05:30',
  },
  {
    standId: 'ccm-auto-1',
    name: 'Chandni Chowk Stand',
    coordinates: [77.231, 28.656],
    availableVehiclesEstimate: 1,
    passengerQueueLevel: 'crowded',
    averageWaitMinutes: 11,
    lastUpdated: '2026-12-01T09:00:00+05:30',
  },
];
