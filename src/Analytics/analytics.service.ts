import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(private readonly dataSource: DataSource) {}

  async getVehicleAnalytics24h(vehicleId: string) {
    const result = await this.dataSource.query(
      `
      SELECT
        vs.vehicle_id,
        vs.meter_id,
        SUM(ms.kwh_consumed_ac)  AS total_ac,
        SUM(vs.kwh_delivered_dc) AS total_dc,
        CASE
          WHEN SUM(ms.kwh_consumed_ac) > 0
          THEN SUM(vs.kwh_delivered_dc) / SUM(ms.kwh_consumed_ac)
          ELSE 0
        END                      AS efficiency,
        AVG(vs.battery_temp)     AS avg_temp
      FROM vehicle vs
      JOIN meter_stream ms
        ON vs.meter_id = ms.meter_id
       AND vs.timestamp = ms.timestamp
      WHERE vs.vehicle_id = $1
        AND vs.timestamp >= NOW() - INTERVAL '24 hours'
      GROUP BY vs.vehicle_id, vs.meter_id
      `,
      [vehicleId],
    );

    return result[0] || null;
  }
}
