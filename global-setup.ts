import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';

async function globalSetup() {
    const profilePath = path.join(__dirname, `tests-profiles`);
    const files = fs.readdirSync(profilePath).filter(
      (file) => {return file.endsWith('.zip')}
    );
    files.forEach( (file) => {
      if (!fs.existsSync(path.join(profilePath, file.replace('\.zip', '')))) {
        console.log('Unzip ' + file);
        const zip = new AdmZip(path.join(profilePath, file));
        zip.extractAllTo(profilePath, true);
      }
    });
}

export default globalSetup;
