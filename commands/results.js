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

import NodeFetchCache, {FileSystemCache} from 'node-fetch-cache';
import qs from 'qs';
import {error} from '../lib/util.js';

const fetch = NodeFetchCache.create({
  cache: new FileSystemCache(),
});
const cleanup = str => str.replaceAll(/ /g, '-');
const cleanupNewLines = str => str.replaceAll(/[\r\n]/g, ' ').slice(0, 200);

export default async function results(raw_results_url, options = {}) {
  const response = await fetch(raw_results_url);
  if (response.status != 200) {
    error(await response.text());
    return;
  }

  const data = await response.json();
  data.results.forEach(test => {
    console.log(`${cleanup(test.test)}: ${test.status}`)
    for (const subtest of test.subtests) {
      let line = `${cleanup(test.test)}:${cleanup(subtest.name)}: ${subtest.status}`;
      if (subtest.message) {
        line += ` ${cleanupNewLines(subtest.message)}`;
      }
      console.log(line)
    }
  })
}
