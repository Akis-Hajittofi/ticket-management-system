"use client";
import React, { useContext, useState } from "react";
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
import { TicketContext } from "../ticket-provider";



function Page() {
  const [ticketsState, setTicketsState] = useContext(TicketContext);
  console.log(ticketsState);
  const [filter, setFilter] = useState({
    priority: "Low Medium High",
    status: "Open In Progress Resolved",
  });

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
  const handleDelete = (id) => {
    setTicketsState(ticketsState.filter((ticket) => ticket.id !== id));
  };

  const handleFilter = (value, selectItem) => {
    if (selectItem === "priority") {
      setFilter({ ...filter, priority: value });
    } else if (selectItem === "status") {
      setFilter({ ...filter, status: value });
    }
  };

  return (
    <div className="flex flex-row">
      <div className="p-8 space-y-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-16">Create Ticket</Button>
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

        <div>
          <Label>Priority</Label>
          <Select onValueChange={(e) => handleFilter(e, "priority")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" defaultValue="Low Medium High" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low Medium High">All</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Status</Label>
          <Select onValueChange={(e) => handleFilter(e, "status")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="All"
                defaultValue="Open In progress Resolved"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open In Progress Resolved">All</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table
        tickets={ticketsState}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Page;
