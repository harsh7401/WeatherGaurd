import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: any) {
    return {
      message: 'Google Login Successful',
      user: req.user,
    };
  }
}