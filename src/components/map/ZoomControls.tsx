import { Plus, Minus } from 'lucide-react';
import { useControls } from 'react-zoom-pan-pinch';

interface ZoomControlsProps {
  scale: number;
}

/**
 * Компонент для керування зумом (Горизонтальний слайдер).
 */
export function ZoomControls({ scale }: ZoomControlsProps) {
  const { zoomIn, zoomOut, setTransform, instance } = useControls();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    const { positionX, positionY } = instance.transformState;
    setTransform(positionX, positionY, newScale, 0);
  };

  return (
    <div className="absolute bottom-4 left-4 z-20 hidden md:flex flex-row items-center gap-4 bg-background/90 backdrop-blur-md rounded-full py-2 px-4 shadow-lg border border-border/50 transition-all">
      <button
        onClick={() => zoomOut(0.2)}
        className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-foreground"
        title="Зменшити"
      >
        <Minus className="w-5 h-5" />
      </button>

      {/* Контейнер слайдера */}
      <div className="w-48 relative flex items-center justify-center">
        <input
          type="range"
          min={0.5}
          max={4}
          step={0.1}
          value={scale}
          onChange={handleSliderChange}
          className="w-full h-1.5 cursor-pointer appearance-none bg-secondary rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:hover:bg-primary/80 transition-all"
        />
      </div>

      <button
        onClick={() => zoomIn(0.2)}
        className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-foreground"
        title="Збільшити"
      >
        <Plus className="w-5 h-5" />
      </button>

      <span className="text-xs font-bold text-muted-foreground w-8 text-center select-none">
        {Math.round(scale * 100)}%
      </span>
    </div>
  );
}
