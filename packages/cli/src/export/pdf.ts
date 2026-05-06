import puppeteer from 'puppeteer';
import { renderHtml } from './html';
import { ExportSession } from './builder';

export async function renderPdf(session: ExportSession, outPath: string) {
  const html = renderHtml(session);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: outPath, format: 'A4' });
  await browser.close();
}
