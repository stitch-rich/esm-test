import { Application } from 'express';
import { DateTime } from 'luxon';

const Time = DateTime.now();

export function metaInformation(app: Application) {
  app.route('/healthcheck').get(async (req, res) => {
    return res.json({
      message: 'Success',
      time: DateTime.now().toISO(),
      deployed: Time.toRelative(),
      environment: process.env.ENVIRONMENT,
      LDFlags: req.app.get('LDFlags'),
    });
  });
}
