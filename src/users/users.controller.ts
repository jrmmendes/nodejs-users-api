import { controller, httpGet } from "inversify-express-utils";

@controller('/users')
export class UserControler {
  @httpGet('/')
  async helloWorld(): Promise<string> {
    return 'application works!'
  }
}
