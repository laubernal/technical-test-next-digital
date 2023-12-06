import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

export class CryptoService {
  private scryptAsync = promisify(scrypt);

  public async hash(pin: number): Promise<string> {
    const salt = randomBytes(8).toString('hex');

    const buffer = (await this.scryptAsync(pin.toString(), salt, 64)) as Buffer;

    return `${buffer.toString('hex')}-${salt}`;
  }

  public async compare(storedPin: string, suppliedPin: number) {
    const [hashedPin, salt] = storedPin.split('-');

    const buffer = (await this.scryptAsync(
      suppliedPin.toString(),
      salt,
      64,
    )) as Buffer;

    return buffer.toString('hex') === hashedPin;
  }
}
