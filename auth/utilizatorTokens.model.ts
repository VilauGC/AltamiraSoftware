export class UtilizatorTokens {
  constructor(public access_token: string, public refresh_token: string) {}

  get token() {
    return this.access_token;
  }

  get refreshToken() {
    return this.refresh_token;
  }
}
