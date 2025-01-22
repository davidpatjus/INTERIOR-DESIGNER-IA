import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RoomType({ selectedRoomType}: any) {
  return (
    <div>
			<label className="text-slate-500">Selecciona El Tipo De Interior *</label>
      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tipo De Interior" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Living Room">Sala De Estar</SelectItem>
          <SelectItem value="Bedroom">Dormitorio</SelectItem>
          <SelectItem value="Kitchen">Cocina</SelectItem>
          <SelectItem value="Office">Oficina</SelectItem>
          <SelectItem value="Bathroom">Lavabo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default RoomType;
