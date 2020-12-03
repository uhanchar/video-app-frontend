enum Environments {
  production = 'production',
}

export function isProduction() {
  return process.env.NODE_ENV === Environments.production;
}

export default Environments;
