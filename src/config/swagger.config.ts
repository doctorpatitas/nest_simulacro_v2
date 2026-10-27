import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

const logger = new Logger('Swagger');

export const swaggerConfig = (app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle('Arenosa Hoteles - API')
        .setDescription('')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    logger.log('Docs available at http://localhost:3000/api/docs');
};