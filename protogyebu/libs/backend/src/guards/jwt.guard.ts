// import { AuthGuard } from '@nestjs/passport';

// import { Injectable, UnauthorizedException } from '@nestjs/common';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//     handleRequest(err, token) {
//         if (err || !token) {
//             throw err || new UnauthorizedException('인증되지 않은 사용자');
//         }

//         return token;
//     }
// }
export class JwtAuthGuard { }