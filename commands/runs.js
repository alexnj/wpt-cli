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

import chalk from 'chalk';
import fetch from 'node-fetch';
import qs from 'qs';
import {error} from '../lib/util.js';

const ignoreKeys = new Set(['labels']);

export default async function runs(options) {
  const query = qs.stringify(options, {arrayFormat: 'repeat'});
  const response = await fetch(`https://wpt.fyi/api/runs?${query}`);
  if (response.status != 200) {
    error(await response.text());
    return;
  }

  const data = await response.json();
  data.forEach(run => {
    for (const prop in run) {
      if (ignoreKeys.has(prop)) {
        continue;
      }
      console.log(`${prop}: ${run[prop]}`)
    }
    console.log(chalk.yellow("=="));
  })
}
