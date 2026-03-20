import QRCode from 'qrcode';
import { QR_GENERATION } from '../config/qr';

interface QRCodeOptions {
  width?: number;
  margin?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  color?: {
    dark?: string;
    light?: string;
  };
}

/**
 * Generate a QR code as a base64 data URL.
 * Isomorphic (server + client). All call sites should use this
 * rather than calling QRCode.toDataURL directly.
 */
export async function generateQRCodeBase64(
  payload: string,
  options: QRCodeOptions = {}
): Promise<string> {
  return QRCode.toDataURL(payload, {
    width: options.width ?? QR_GENERATION.width,
    margin: options.margin ?? QR_GENERATION.margin,
    errorCorrectionLevel: options.errorCorrectionLevel ?? QR_GENERATION.errorCorrectionLevel,
    color: options.color ?? QR_GENERATION.color,
    type: 'image/png',
  });
}
