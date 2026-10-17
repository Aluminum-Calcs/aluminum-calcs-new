

import { MATERIALS } from './materials.js';
import { Material } from './material.js';

export const material_list = Object.entries(MATERIALS).map(
  ([id, data]) => new Material(id, data)
);