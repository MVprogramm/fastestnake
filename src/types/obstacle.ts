/**
 * @type obstacleContactProps Аргументы функции, проверяющей контакты препятствий
 */
/**
 * Функция, проверяющая контакты препятствий, получает параметры:
 *   1. type - тип препятствия по направлению движения
 *   2. i - индекс препятствия в соответствуюшем массиве
 *   3. twist - порядок считывания х и y из массива координат
 *   4. coord - массив координат препятствий типа type
 *   5. step - массив шагов препятствий типа type
 */
export interface obstacleContactProps {
  i: number;
  twist: number[];
  coord: number[][];
  step: number[];
}
/**
 * Функция, реализующая отскок препятствия от преграды получает параметры:
 *  1. obstacleContactProps
 *  2. cell - координаты [x, y] препятствия, от которого возможен отскок
 */
export interface newObstacleStep extends obstacleContactProps {
  cell: number[];
}

export type obstacleData = {
  coord: number[][];
  step: number[];
};

export type hedgehogProps = {
  direction: number[];
  index: number;
  line: string;
};

export type MushroomProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export interface TreeProps {
  position: [number, number, number]; // Позиция дерева в 3D-пространстве (x, y, z).
  rotation?: [number, number, number]; // Вращение дерева вокруг осей (x, y, z) в радианах. Опциональный пропс.
  scale?: [number, number, number]; // Масштабирование дерева по осям (x, y, z). Опциональный пропс.
  color?: number; // Цвет дерева в виде шестнадцатеричного значения (например, 0xa2d109). Опциональный пропс.
}
