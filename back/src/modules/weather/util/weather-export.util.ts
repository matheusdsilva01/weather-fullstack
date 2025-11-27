import { Workbook } from 'exceljs';
import { writeToString } from 'fast-csv';
import { WeatherDTO } from '../dto/weather.dto';

export type WeatherExportFormat = 'csv' | 'xlsx';

export interface WeatherExportPayload {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
}

const WEATHER_HEADERS = [
  'latitude',
  'longitude',
  'temperature',
  'apparent_temperature',
  'time',
  'wind_speed',
  'wind_direction',
  'wind_gusts',
  'precipitation',
  'cloud_cover',
  'relative_humidity',
  'weather_code',
];

export async function buildWeatherExport(
  rows: WeatherDTO[],
  format: WeatherExportFormat,
): Promise<WeatherExportPayload> {
  if (format === 'xlsx') {
    return buildWeatherXlsx(rows);
  }
  return buildWeatherCsv(rows);
}

async function buildWeatherXlsx(
  rows: WeatherDTO[],
): Promise<WeatherExportPayload> {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Weather');

  worksheet.columns = WEATHER_HEADERS.map((header) => ({
    header,
    key: header,
  }));

  rows.forEach((row) => {
    const record = {};
    WEATHER_HEADERS.forEach((header) => {
      record[header] = row[header as keyof WeatherDTO];
    });
    worksheet.addRow(record);
  });

  const xlsxBuffer = await workbook.xlsx.writeBuffer();
  const buffer = Buffer.from(xlsxBuffer);

  return {
    buffer,
    mimeType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fileName: buildFileName('xlsx'),
  };
}

async function buildWeatherCsv(
  rows: WeatherDTO[],
): Promise<WeatherExportPayload> {
  const data = rows.map((row) => {
    const record: Record<string, unknown> = {};
    WEATHER_HEADERS.forEach((header) => {
      record[header] = row[header as keyof WeatherDTO];
    });
    return record;
  });

  const csvString = await writeToString(data, { headers: true });

  return {
    buffer: Buffer.from(csvString, 'utf8'),
    mimeType: 'text/csv',
    fileName: buildFileName('csv'),
  };
}

function buildFileName(extension: string): string {
  const timestamp = new Date().toISOString().split('T')[0];
  return `weather-export-${timestamp}.${extension}`;
}
