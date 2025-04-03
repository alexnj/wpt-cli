#! /usr/bin/env node

/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {program} from 'commander';
import runs from './commands/runs.js';
import results from './commands/results.js';
import {collect, defaultValue} from './lib/util.js';

program.command('runs')
  .description('Gets the TestRun metadata for all runs')
  .option('--sha',
    'sha[0:10] of the runs to get, or the keyword latest. Defaults to `latest`.',
    'latest')
  .option('-p, --product <value>',
    'Product(s) to include (repeatable), e.g. `chrome` or `firefox-60`.',
    collect,
    defaultValue(['chrome']))
  .action(runs);

program.command('results <raw_results_url>')
  .description('Prints the detailed results from a single run raw results')
  .action(results);

program.parse();
