import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as STS from 'qcloud-cos-sts';

const config = {
  secretId: process.env.COS_SECRET_ID,
  secretKey: process.env.COS_SECRET_KEY,
  proxy: '',
  durationSeconds: 1800,
  endpoint: 'sts.tencentcloudapi.com',
  bucket: 're-avatar-1300859107',
  region: 'ap-shanghai',
  allowPrefix: '',
  allowActions: ['name/cos:PutObject', 'name/cos:PostObject'],
};

@Controller('/cosConfig')
export class UploadController {
  @Post()
  async generate(@Res() response: Response) {
    const shortBucketName = config.bucket.substring(
      0,
      config.bucket.lastIndexOf('-'),
    );
    const appId = config.bucket.substring(1 + config.bucket.lastIndexOf('-'));
    const policy = {
      version: '2.0',
      statement: [
        {
          action: config.allowActions,
          effect: 'allow',
          principal: { qcs: ['*'] },
          resource: [
            'qcs::cos:' +
              config.region +
              ':uid/' +
              appId +
              ':prefix//' +
              appId +
              '/' +
              shortBucketName +
              '/' +
              config.allowPrefix,
          ],
        },
      ],
    };
    STS.getCredential(
      {
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        endpoint: config.endpoint,
        policy: policy,
      },
      function (err, tempKeys) {
        console.log(tempKeys.credentials);

        return response.send({
          code: 200,
          data: tempKeys.credentials,
        });
      },
    );
  }
}
