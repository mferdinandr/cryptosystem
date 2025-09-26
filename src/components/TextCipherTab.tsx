import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FileDown } from "lucide-react";
import { TabsContent } from "./ui/tabs";

type TextCipherTabProps = {
  inputText: string;
  setInputText: (value: string) => void;
  processText: (operation: "encrypt" | "decrypt") => void;
  rawOutput: string;
  formattedOutput: string;
  lastOperation: "encrypt" | "decrypt" | null;
  setOutputFormat: (value: string) => void;
  handleDownloadTextOutput: () => void;
};

export function TextCipherTab({
  inputText,
  setInputText,
  processText,
  rawOutput,
  formattedOutput,
  lastOperation,
  setOutputFormat,
  handleDownloadTextOutput,
}: TextCipherTabProps) {
  return (
    <TabsContent value="text" className="mt-4">
      <div className="grid gap-4">
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
          <Button onClick={() => processText("encrypt")}>Encrypt</Button>
          <Button onClick={() => processText("decrypt")} variant="outline">
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
