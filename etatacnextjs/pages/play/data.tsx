"use client";
import React, { useEffect, useState, useContext } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { ArrayContext } from "@/components/global";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "@heroui/button";

export default function DataPage() {
  const { splits } = useContext(ArrayContext);
  // const splits = []
  const columns = [
    {
      key: "question",
      label: "Question",
    },
    {
      key: "elapsed",
      label: "Time",
    },
    {
      key: "answer_method",
      label: "Method",
    },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Data</h1>
          {splits?.length > 0 ? (
            <div className="flex flex-col py-7 gap-4">
              <div className="flex gap-2">
                <p>
                  Questions Answered: {Math.round(splits?.length * 1000) / 1000}
                </p>
                <p>
                  Total time played:{" "}
                  {Math.round(
                    splits?.reduce(
                      (sum, obj) => sum + (obj["elapsed"] || 0),
                      0
                    ) * 1000
                  ) / 1000}{" "}
                  seconds
                </p>
              </div>
              <CSVLink data={splits}>
                <Button color="success">Download data as csv</Button>
              </CSVLink>
              <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={splits}>
                  {(item) => (
                    <TableRow key={`${item.question}${item.elapsed}`}>
                      {(columnKey) => (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-7 text-5xl">
              answer atleast 1 question to see data
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
