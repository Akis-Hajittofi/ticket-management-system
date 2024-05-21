"use client";
import React, { useState } from "react";
import Table from "./Table";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentDate } from "@/lib/utils";

const tickets = [
  {
    id: 1,
    requester: "Joey",
    title: "Printer is jammed",
    description:
      "Every time I try and print, I get error messages saying that printer is jammed.",
    date: "20/05/2024",
    status: "Open",
    priority: "Medium",
    resolutionDate: "",
    assignedAgent: "Admin",
  },
  {
    id: 2,
    requester: "Rachel",
    title: "Cannot access email",
    description:
      "I am unable to access my email account. It keeps asking for a password reset.",
    date: "18/05/2024",
    status: "In Progress",
    priority: "High",
    resolutionDate: "",
    assignedAgent: "Monica",
  },
  {
    id: 3,
    requester: "Chandler",
    title: "Computer running slow",
    description:
      "My computer has been running extremely slow for the past week.",
    date: "15/05/2024",
    status: "Open",
    priority: "Low",
    resolutionDate: "",
    assignedAgent: "Ross",
  },
  {
    id: 4,
    requester: "Monica",
    title: "Software installation required",
    description:
      "I need the latest version of Photoshop installed on my workstation.",
    date: "17/05/2024",
    status: "Resolved",
    priority: "Medium",
    resolutionDate: "19/05/2024",
    assignedAgent: "Chandler",
  },
  {
    id: 5,
    requester: "Phoebe",
    title: "Unable to connect to VPN",
    description: "I can't connect to the VPN when working from home.",
    date: "19/05/2024",
    status: "Open",
    priority: "High",
    resolutionDate: "",
    assignedAgent: "Joey",
  },
  {
    id: 6,
    requester: "Ross",
    title: "Forgotten password",
    description: "I forgot the password to my computer. Need a reset.",
    date: "20/05/2024",
    status: "Resolved",
    priority: "Low",
    resolutionDate: "20/05/2024",
    assignedAgent: "Phoebe",
  },
  {
    id: 7,
    requester: "Gunther",
    title: "Coffee machine not working",
    description:
      "The coffee machine in the break room is not working. Displays an error code.",
    date: "18/05/2024",
    status: "Open",
    priority: "Medium",
    resolutionDate: "",
    assignedAgent: "Rachel",
  },
  {
    id: 8,
    requester: "Janice",
    title: "Phone line issues",
    description:
      "There's a lot of static on the office phone line. Hard to hear clients.",
    date: "16/05/2024",
    status: "In Progress",
    priority: "High",
    resolutionDate: "",
    assignedAgent: "Chandler",
  },
  {
    id: 9,
    requester: "Mike",
    title: "Projector bulb needs replacement",
    description:
      "The bulb in the conference room projector needs to be replaced.",
    date: "15/05/2024",
    status: "Resolved",
    priority: "Low",
    resolutionDate: "16/05/2024",
    assignedAgent: "Monica",
  },
  {
    id: 10,
    requester: "Emily",
    title: "Access to shared drive",
    description: "I need access to the shared drive for the marketing team.",
    date: "19/05/2024",
    status: "Open",
    priority: "Medium",
    resolutionDate: "",
    assignedAgent: "Ross",
  },
];

function Page() {
  const [ticketsState, setTicketsState] = useState(tickets);
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
  });
  const handleSubmit = (values) => {
    ticketsState.push({
      ...values,
      id: Math.floor(Math.random() * (1999 - 100 + 1)) + 100,
      date: currentDate(),
      status: "Open",
    });
    setTicketsState([...ticketsState]);
  };
  const handleDelete = (index) => {
    ticketsState.splice(index, 1);
    setTicketsState([...ticketsState]);
  };

  return (
    <div className="flex -flex-row">
      {/* btn here , this will add to the state */}
      {/* controls here, this will update the state */}
      {/* table below, will render table state  */}
      <div className="p-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="h-16"
              onClick={() => console.log("IT WAS CLICKED!!!")}
            >
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Ticket</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a description here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Set the priority of your ticket" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div></div>
      <Table tickets={ticketsState} handleDelete={handleDelete} />
    </div>
  );
}

export default Page;
