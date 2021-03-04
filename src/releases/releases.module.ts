import { Module } from '@nestjs/common';
import { ReleasesController } from './releases.controller';
import { ReleasesApiController } from './releases-api.controller';
import { ReleasesService } from './releases.service';
import { MbController } from './mb.controller';
import { GraphBrainzController } from './graphbrainz.controller';
import { MusicBrainzApi } from 'musicbrainz-api';
import { createClient, RedisClient } from 'redis';

@Module({
  controllers: [ReleasesController, ReleasesApiController, MbController, GraphBrainzController],
  providers: [
    ReleasesService,
    {
      provide: MusicBrainzApi,
      useFactory: async (): Promise<MusicBrainzApi> => {
        return new MusicBrainzApi({
          appName: 'PatricianDB',
          appVersion: '0.0.1', // TODO: Use package.json version
          appContactInfo: 'https://github.com/patricianapp/PatricianDB',
        });
      },
    },
    {
      provide: RedisClient,
      useFactory: async (): Promise<RedisClient> => {
        return createClient(process.env.DATABASE_URL ?? 'redis://localhost:6379');
      },
    },
  ],
})
export class ReleasesModule {}
