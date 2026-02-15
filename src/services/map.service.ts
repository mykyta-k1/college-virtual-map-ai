/**
 * Сервіс для роботи з картою та координатною сіткою.
 */
export class MapService {
  /**
   * Розраховує координати кліку відносно SVG системи координат.
   * Автоматично враховує трансформації (zoom, pan) через getScreenCTM().
   *
   * @param event Подія миші (React.MouseEvent або MouseEvent)
   * @param svgElement Посилання на SVG елемент
   * @returns Об'єкт { x, y } або null, якщо неможливо розрахувати
   */
  public static getSVGClickCoordinates(
    event: React.MouseEvent | MouseEvent,
    svgElement: SVGSVGElement,
  ): { x: number; y: number } | null {
    if (!svgElement || !svgElement.getScreenCTM) return null;

    // Створюємо SVG точку для трансформації
    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    // Отримуємо матрицю трансформації з SVG в Екранні координати
    const ctm = svgElement.getScreenCTM();
    if (!ctm) return null;

    // Трансформуємо точку з Екранних в SVG координати використовуючи обернену матрицю
    const transformedPoint = point.matrixTransform(ctm.inverse());

    return {
      x: Math.round(transformedPoint.x),
      y: Math.round(transformedPoint.y),
    };
  }
}
