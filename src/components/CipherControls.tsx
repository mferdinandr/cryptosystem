import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CipherType, CIPHER_NAMES } from "../lib/types";

type CipherControlsProps = {
  activeTab: string;
  selectedCipher: CipherType;
  setSelectedCipher: (value: CipherType) => void;
};

export function CipherControls({
  activeTab,
  selectedCipher,
  setSelectedCipher,
}: CipherControlsProps) {
  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col gap-2">
        <Label htmlFor="cipher-select">Cipher Algorithm</Label>
        <Select
          onValueChange={(v) => setSelectedCipher(v as CipherType)}
          defaultValue={selectedCipher}
          disabled={activeTab === "file"}
        >
          <SelectTrigger id="cipher-select">
            <SelectValue placeholder="Select a cipher" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CIPHER_NAMES).map(([k, name]) => (
              <SelectItem key={k} value={k}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
