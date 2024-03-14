import path from 'path';
import AdmZip from 'adm-zip';
import fs from "fs";

async function globalTeardown() {
    const reportPath = path.join(__dirname, `playwright-report`);
    const zip = new AdmZip();
    if (fs.existsSync(path.join(reportPath))) {
      zip.addLocalFolder(reportPath, `./playwright-report`);
      zip.writeZip(`./playwright-report.zip`);
    }
}

export default globalTeardown;
