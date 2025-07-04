import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Plus, Upload } from "lucide-react";
  
  export function AddCourseModal() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition cursor-pointer">
            <Plus className="h-4 w-4" /> Add Course
          </Button>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
  
          <div className="space-y-4">
            {/* Course Code */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="code">
                Course Code
              </label>
              <Input id="code" placeholder="e.g., CS 201" />
            </div>
  
            {/* Course Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="name">
                Course Name
              </label>
              <Input id="name" placeholder="e.g., Data Structures" />
            </div>
  
            {/* Upload Box */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center space-y-3 text-muted-foreground transition-shadow hover:border-blue-500 hover:shadow-md">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                <p className="text-sm">Upload Syllabus</p>
                <p className="text-xs">PDF, DOC, or DOCX files</p>
                <div className="flex justify-center">
                    <Input
                    type="file"
                    className="w-fit text-sm file:text-sm file:py-1 file:px-3 file:border-0 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                </div>
            </div>
          </div>
  
          <DialogFooter className="mt-4">
            <Button className="w-full bg-foreground text-white hover:opacity-90 transition cursor-pointer">
              Create Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  