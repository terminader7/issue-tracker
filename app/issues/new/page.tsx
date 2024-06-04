"use client";
import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface NewIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  //This allows us to register our input fields with react-hook-form
  const { register, control } = useForm<NewIssueForm>();

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Describe your issue here..." {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
