"use client";
import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface NewIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  //This allows us to register our input fields with react-hook-form
  const { register, control, handleSubmit } = useForm<NewIssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios
          .post("/api/issues", data)
          .then(() => router.push("/issues"));
      })}
    >
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
    </form>
  );
};

export default NewIssuePage;
