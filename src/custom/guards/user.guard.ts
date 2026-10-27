import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { TEST_USERS } from "../../users/users.memory.js";

@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const userId = request.headers['x-user'];
        const validUser = TEST_USERS.find(u => u.id === userId)
 
        if(!validUser) {
            throw new UnauthorizedException('Usuario inválido')
        }
        
        request.user = validUser;

        return true
    }
}