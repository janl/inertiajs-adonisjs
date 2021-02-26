import { join } from 'path';
import * as sinkStatic from '@adonisjs/sink';
import { ApplicationContract } from '@ioc:Adonis/Core/Application';

/**
 * Returns absolute path to the stub relative from the templates
 * directory
 */
function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths);
}

/**
 * Instructions to be executed when setting up the package.
 */
export default async function instructions(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const configPath = app.configPath('inertia.ts');
  const inertiaConfig = new sink.files.MustacheFile(projectRoot, configPath, getStub('inertia.txt'));

  inertiaConfig.overwrite = true;
  inertiaConfig.apply().commit();

  const configDir = app.directoriesMap.get('config') || 'config';
  sink.logger.action('create').succeeded(`${configDir}/inertia.ts`);
}