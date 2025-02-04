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
import { div } from "framer-motion/client";

export default function DataPage() {
  const { splits, setSplits } = useContext(ArrayContext);
  const columns = [
    {
      key: "question",
      label: "Question",
    },
    {
      key: "elapsed",
      label: "Time",
    },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Data</h1>
          {splits.length > 0 ? (
            <div className="py-7">
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
