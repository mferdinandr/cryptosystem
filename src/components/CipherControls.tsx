import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { CipherType, CIPHER_NAMES } from "..//lib/types";

type CipherControlsProps = {
  activeTab: string;
  selectedCipher: CipherType;
  setSelectedCipher: (value: CipherType) => void;
  keyVal: string;
  setKey: (value: string) => void;
  handleKeyFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  KEY_PLACEHOLDERS: Record<string, string>;
};

export function CipherControls({
  activeTab,
  selectedCipher,
  setSelectedCipher,
  keyVal,
  setKey,
  handleKeyFileChange,
  KEY_PLACEHOLDERS,
}: CipherControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="cipher-select">Cipher Algorithm</Label>
        <Select
          onValueChange={(v) => setSelectedCipher(v as CipherType)}
          defaultValue={CipherType.Shift}
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

      {selectedCipher === CipherType.OneTimePad ? (
        <div className="flex flex-col gap-2">
          <Label htmlFor="key-file-input">File Kunci (.txt)</Label>
          <Input
            id="key-file-input"
            type="file"
            accept=".txt"
            onChange={handleKeyFileChange}
            disabled={activeTab === "file"}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Label htmlFor="key-input">Key</Label>
          <Input
            id="key-input"
            placeholder={
              KEY_PLACEHOLDERS[selectedCipher as keyof typeof KEY_PLACEHOLDERS]
            }
            value={keyVal}
            onChange={(e) => setKey(e.target.value)}
            disabled={activeTab === "file"}
          />
        </div>
      )}
    </div>
  );
}
