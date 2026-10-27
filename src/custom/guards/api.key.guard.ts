import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        const validKeys = this.configService.getOrThrow<string[]>('apiKeys');

        if(!validKeys || !validKeys.includes(apiKey)){
            throw new UnauthorizedException('API key inválida o ausente')
        }

        return true
    }
}