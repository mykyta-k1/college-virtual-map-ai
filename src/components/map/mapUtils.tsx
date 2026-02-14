import {
  GraduationCap,
  Briefcase,
  Bath,
  ArrowUpFromDot,
  Utensils,
  Wrench,
  LayoutDashboard,
  HelpCircle,
} from 'lucide-react';
import type { RoomType } from '@/config/floorsConfig';

export const getRoomIcon = (type: RoomType, className?: string) => {
  const props = { className: className || 'w-5 h-5' };

  switch (type) {
    case 'classroom':
      return <GraduationCap {...props} className={`${props.className} text-blue-500`} />;
    case 'office':
      return <Briefcase {...props} className={`${props.className} text-indigo-500`} />;
    case 'wc':
      return <Bath {...props} className={`${props.className} text-cyan-500`} />;
    case 'stairs':
      return <ArrowUpFromDot {...props} className={`${props.className} text-gray-500`} />;
    case 'food':
      return <Utensils {...props} className={`${props.className} text-orange-500`} />;
    case 'utility':
      return <Wrench {...props} className={`${props.className} text-slate-500`} />;
    case 'hall':
      return <LayoutDashboard {...props} className={`${props.className} text-purple-500`} />;
    default:
      return <HelpCircle {...props} className={`${props.className} text-muted-foreground`} />;
  }
};

/**
 * Calculates the coordinates of a click event relative to the SVG coordinate system.
 * Handles zoom and pan transformations automatically via getScreenCTM().
 */
export const getSVGClickCoordinates = (
  event: React.MouseEvent | MouseEvent,
  svgElement: SVGSVGElement,
): { x: number; y: number } | null => {
  if (!svgElement || !svgElement.getScreenCTM) return null;

  // Create an SVG point to transform
  const point = svgElement.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;

  // Get the transformation matrix from SVG to Screen
  const ctm = svgElement.getScreenCTM();
  if (!ctm) return null;

  // Transform the point from Screen to SVG using the inverse matrix
  const transformedPoint = point.matrixTransform(ctm.inverse());

  return {
    x: Math.round(transformedPoint.x),
    y: Math.round(transformedPoint.y),
  };
};
