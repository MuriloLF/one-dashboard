
import React from "react";
import { Input } from "./ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorPicker = ({ color, onChange, className }: ColorPickerProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 p-1 border rounded cursor-pointer"
      />
    </div>
  );
};

export default ColorPicker;
