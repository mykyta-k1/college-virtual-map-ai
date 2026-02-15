import React, { useMemo } from 'react';
import type { PathNode } from '@/config/navigatorPathsConfig';

interface RouteOverlayProps {
  path: PathNode[];
  currentFloorId: number;
  width?: string | number;
  height?: string | number;
  viewBox?: string; // Add viewBox prop
  onFloorChange?: (floorId: number) => void;
}

/**
 * Компонент для візуалізації маршруту на мапі.
 * Малює SVG лінію поверх карти поверху.
 */
export const RouteOverlay: React.FC<RouteOverlayProps> = ({
  path,
  currentFloorId,
  width = '100%',
  height = '100%',
  viewBox = '0 0 1658 421', // Default to floor 1 dimensions if not provided
  onFloorChange,
}) => {
  // Фільтруємо шлях, залишаючи тільки точки поточного поверху
  // Для мульти-поверхових маршрутів це покаже частину шляху на поточному поверсі
  const floorPath = useMemo(() => {
    if (!path || path.length < 2) return null;
    return path.filter((node) => node.floor === currentFloorId);
  }, [path, currentFloorId]);

  // Генеруємо SVG path data
  // M x1 y1 L x2 y2 L x3 y3 ...
  const pathData = useMemo(() => {
    // We need at least 2 points to draw a line
    if (!floorPath || floorPath.length < 2) return '';
    return floorPath
      .map((node, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${command} ${node.x} ${node.y}`;
      })
      .join(' ');
  }, [floorPath]);

  // Визначаємо маркери початку та кінця (якщо вони на цьому поверсі)
  const startNode = path[0];
  const endNode = path[path.length - 1];
  const showStartMarker = startNode.floor === currentFloorId;
  const showEndMarker = endNode.floor === currentFloorId;

  // Логіка визначення переходу на інший поверх (Upcoming Transition)
  const transitionData = useMemo(() => {
    // Дозволяємо відображати перехід навіть якщо шлях на поверху складається з 1 точки
    if (!floorPath || floorPath.length === 0) return null;

    if (!path || path.length < 2) return null;

    // Знаходимо останню точку на ЦЬОМУ поверсі
    const lastNodeOnFloor = floorPath[floorPath.length - 1];
    if (!lastNodeOnFloor) return null;

    // Знаходимо її індекс у ПОВНОМУ маршруті
    // Використовуємо findLastIndex або просто шукаємо з кінця, оскільки точки унікальні за ID
    const fullPathIndex = path.findIndex((n) => n.id === lastNodeOnFloor.id);

    if (fullPathIndex !== -1 && fullPathIndex < path.length - 1) {
      const nextNode = path[fullPathIndex + 1];
      // Якщо наступна точка існує і вона на іншому поверсі
      if (nextNode && nextNode.floor !== currentFloorId) {
        return {
          node: lastNodeOnFloor,
          nextFloor: nextNode.floor,
        };
      }
    }
    return null;
  }, [path, floorPath, currentFloorId]);

  // Якщо це проміжний поверх (лише 1 точка), все одно рендеримо
  if (!floorPath || floorPath.length === 0) return null;

  // If there's only one node on this floor and it's not a transition point, don't render anything.
  // If it is a transition point, transitionData will be present and we want to render the button.
  if (floorPath.length === 1 && !transitionData) return null;

  // Якщо це проміжний поверх (лише 1 точка), все одно рендеримо

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10"
      width={width}
      height={height}
      style={{ width: '100%', height: '100%' }}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Градієнт для лінії маршруту */}
        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        {/* Тінь для лінії */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Маркер кінця (стрілка) */}
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
        </marker>

        {/* Анімація для лінії */}
        <style>
          {`
              .route-line {
                stroke-dasharray: 20;
                stroke-dasharray: 20;
                animation: dash 1s linear infinite;
              }
              .float-animation {
                animation: float 2s ease-in-out infinite;
              }
              @keyframes dash {
                to {
                  stroke-dashoffset: -40;
                }
              }
              @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0px); }
              }
            `}
        </style>
      </defs>

      {/* Основна лінія маршруту (тільки якщо є > 1 точки) */}
      {pathData && (
        <path
          d={pathData}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className="route-line opacity-90"
        />
      )}

      {/* Точки початку і кінця */}
      {showStartMarker && (
        <circle
          cx={startNode.x}
          cy={startNode.y}
          r="8"
          fill="#3b82f6"
          stroke="white"
          strokeWidth="2"
        />
      )}

      {showEndMarker && !transitionData && (
        <circle cx={endNode.x} cy={endNode.y} r="8" fill="#ef4444" stroke="white" strokeWidth="2" />
      )}

      {/* Маркер переходу на інший поверх (кнопка) */}
      {transitionData && (
        <g
          className="cursor-pointer float-animation"
          style={{ pointerEvents: 'auto' }}
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Switching to floor ${transitionData.nextFloor}`);
            if (onFloorChange) onFloorChange(transitionData.nextFloor);
          }}
        >
          {/* Тінь кнопки */}
          <rect
            x={transitionData.node.x - 60}
            y={transitionData.node.y - 45}
            width="120"
            height="40"
            rx="20"
            fill="rgba(0,0,0,0.2)"
          />
          {/* Фон кнопки */}
          <rect
            x={transitionData.node.x - 60}
            y={transitionData.node.y - 48}
            width="120"
            height="40"
            rx="20"
            fill="#8b5cf6"
            stroke="white"
            strokeWidth="2"
          />
          {/* Текст кнопки */}
          <text
            x={transitionData.node.x}
            y={transitionData.node.y - 23}
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            style={{ userSelect: 'none' }}
          >
            На поверх {transitionData.nextFloor}
          </text>
          {/* З'єднувальна лінія від точки до кнопки */}
          <line
            x1={transitionData.node.x}
            y1={transitionData.node.y - 8}
            x2={transitionData.node.x}
            y2={transitionData.node.y}
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          {/* Точка на маршруті */}
          <circle
            cx={transitionData.node.x}
            cy={transitionData.node.y}
            r="6"
            fill="#8b5cf6"
            stroke="white"
            strokeWidth="2"
          />
        </g>
      )}
    </svg>
  );
};
