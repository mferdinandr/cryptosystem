import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FileDown } from "lucide-react";
import { TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { CipherType } from "../lib/types";

type TextCipherTabProps = {
  inputText: string;
  setInputText: (value: string) => void;
  handleEncryptClick: () => void;
  handleDecryptClick: () => void;
  rawOutput: string;
  formattedOutput: string;
  lastOperation: "encrypt" | "decrypt" | null;
  setOutputFormat: (value: string) => void;
  handleDownloadTextOutput: () => void;
  selectedCipher: CipherType;
  keyVal: string;
  setKey: (value: string) => void;
  handleKeyFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  KEY_PLACEHOLDERS: Record<string, string>;
};

export function TextCipherTab({
  inputText,
  setInputText,
  handleEncryptClick,
  handleDecryptClick,
  rawOutput,
  formattedOutput,
  lastOperation,
  setOutputFormat,
  handleDownloadTextOutput,
  selectedCipher,
  keyVal,
  setKey,
  handleKeyFileChange,
  KEY_PLACEHOLDERS,
}: TextCipherTabProps) {
  return (
    <TabsContent value="text" className="mt-4">
      <div className="grid gap-4">
        <div className="grid grid-cols-1">
          {selectedCipher === CipherType.OneTimePad ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="key-file-input">File Kunci (.txt)</Label>
              <Input
                id="key-file-input"
                type="file"
                accept=".txt"
                onChange={handleKeyFileChange}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label htmlFor="key-input">Key</Label>
              <Input
                id="key-input"
                placeholder={
                  KEY_PLACEHOLDERS[
                    selectedCipher as keyof typeof KEY_PLACEHOLDERS
                  ]
                }
                value={keyVal}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="input-text">Input (Plaintext / Ciphertext)</Label>
          <Textarea
            id="input-text"
            placeholder="Type your message here..."
            className="min-h-[120px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={handleEncryptClick}>Encrypt</Button>
          <Button onClick={handleDecryptClick} variant="outline">
            Decrypt
          </Button>
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="output-text">Output</Label>
              <Button
                onClick={handleDownloadTextOutput}
                variant="ghost"
                size="icon"
                disabled={!rawOutput}
              >
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
            {lastOperation !== null && (
              <RadioGroup
                defaultValue="grouped"
                onValueChange={setOutputFormat}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="raw" id="r-raw" />
                  <Label htmlFor="r-raw" className="font-normal">
                    Tanpa Spasi
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="grouped" id="r-grouped" />
                  <Label htmlFor="r-grouped" className="font-normal">
                    Kelompok 5-Huruf
                  </Label>
                </div>
              </RadioGroup>
            )}
          </div>
          <Textarea
            id="output-text"
            placeholder="Result will appear here..."
            className="min-h-[120px] bg-muted font-mono"
            value={formattedOutput}
            readOnly
          />
        </div>
      </div>
    </TabsContent>
  );
}
