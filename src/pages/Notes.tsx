
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { FileText, FilePenLine, Eye, Download } from "lucide-react";
import { marked } from "marked";

const NOTES_STORAGE_KEY = "NOTES_MD_CONTENT";

const initialText = `# Notes

Welcome to **Pomeshh Notes**!

- Write your ideas using _Markdown_ 💡
- Switch between **Edit** and **Preview**
- Click Download to get your notes as a markdown file

---

> Try editing the text!  
> Use \`#\` for headers, \`*\` for bold, etc.

Enjoy!
`;

const getSavedNotes = () =>
  typeof window !== "undefined"
    ? localStorage.getItem(NOTES_STORAGE_KEY) || initialText
    : initialText;

const Notes: React.FC = () => {
  const [value, setValue] = useState<string>(getSavedNotes());
  const [tab, setTab] = useState("edit");

  const handleDownload = () => {
    // Save to localStorage for persistence, but let user download as .md
    localStorage.setItem(NOTES_STORAGE_KEY, value);
    const blob = new Blob([value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NOTES.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast("Downloaded NOTES.md", { description: "Your notes have been downloaded." });
  };

  return (
    <div className="flex justify-center items-start w-full px-4 pt-8 pb-16">
      <Card className="w-full max-w-4xl bg-card/90 border-card/70 shadow-2xl">
        <CardHeader className="flex flex-row items-center gap-2">
          <FileText className="text-primary" />
          <CardTitle className="text-xl md:text-2xl">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4 flex gap-2 bg-muted">
              <TabsTrigger value="edit" className="flex items-center gap-1">
                <FilePenLine className="w-4 h-4" /> Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="focus-visible:outline-none">
              <Textarea
                value={value}
                onChange={e => setValue(e.target.value)}
                className="min-h-[480px] font-mono text-base bg-background/80 text-foreground"
                spellCheck={false}
                autoCorrect="off"
                placeholder="Write your markdown notes here..."
                style={{ height: 480, minHeight: 480 }}
              />
            </TabsContent>
            <TabsContent value="preview" className="overflow-auto min-h-[480px] p-3 bg-muted rounded-md border">
              <div
                dangerouslySetInnerHTML={{ __html: marked.parse(value) }}
                className="prose prose-invert max-w-none"
                style={{ minHeight: 400 }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button onClick={handleDownload} className="px-5" variant="secondary">
            <Download className="w-4 h-4 mr-2" /> Download NOTES.md
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Notes;
