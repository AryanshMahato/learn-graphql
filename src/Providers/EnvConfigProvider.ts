export class EnvConfigProvider {
  // Returns current running environment
  public static getEnvironment = () => process.env.NODE_ENV || 'local';

  public static getPort = () => process.env.PORT || 8000;
}
