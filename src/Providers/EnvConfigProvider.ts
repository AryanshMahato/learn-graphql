export class EnvConfigProvider {
  // Returns current running environment
  public static getEnvironment = () => process.env.NODE_ENV || 'local';
}
