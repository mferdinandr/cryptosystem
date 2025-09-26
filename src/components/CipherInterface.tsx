import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

import { useCipher } from "./hooks/useCipher";
import { CipherControls } from "./CipherControls";
import { TextCipherTab } from "./TextCipherTab";
import { FileCipherTab } from "./FileCipherTab";

export function CipherInterface() {
  const cipherProps = useCipher();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Cryptography Toolkit</CardTitle>
        <CardDescription>
          Encrypt and decrypt messages or files using classical ciphers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <CipherControls
            activeTab={cipherProps.activeTab}
            selectedCipher={cipherProps.selectedCipher}
            setSelectedCipher={cipherProps.setSelectedCipher}
            keyVal={cipherProps.key}
            setKey={cipherProps.setKey}
            handleKeyFileChange={cipherProps.handleKeyFileChange}
            KEY_PLACEHOLDERS={cipherProps.KEY_PLACEHOLDERS}
          />

          <Separator />

          <Tabs
            defaultValue="text"
            className="w-full"
            onValueChange={cipherProps.setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Encryption</TabsTrigger>
              <TabsTrigger value="file">File Encryption</TabsTrigger>
            </TabsList>

            <TextCipherTab
              inputText={cipherProps.inputText}
              setInputText={cipherProps.setInputText}
              processText={cipherProps.processText}
              rawOutput={cipherProps.rawOutput}
              formattedOutput={cipherProps.outputFormat}
              lastOperation={cipherProps.lastOperation}
              setOutputFormat={cipherProps.setOutputFormat}
              handleDownloadTextOutput={cipherProps.handleDownloadTextOutput}
            />

            <FileCipherTab
              selectedFile={cipherProps.selectedFile}
              isProcessing={cipherProps.isProcessing}
              handleFileChange={cipherProps.handleFileChange}
              handleFileEncrypt={cipherProps.handleFileEncrypt}
              handleFileDecrypt={cipherProps.handleFileDecrypt}
            />
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
