"use client";
import dynamic from "next/dynamic";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdError } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type NewIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  //This allows us to register our input fields with react-hook-form
  //We are also now intergrating react hook forms with zod
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdError className="w-4 h-4" />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios
              .post("/api/issues", data)
              .then(() => router.push("/issues"));
          } catch (error) {
            setError("An Unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe your issue here..." {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
