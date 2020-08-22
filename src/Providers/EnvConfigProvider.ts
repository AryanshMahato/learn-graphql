export class EnvConfigProvider {
  // Returns current running environment
  public static getEnvironemnt = () => process.env.ENVIRONTMENT || 'local';
}
