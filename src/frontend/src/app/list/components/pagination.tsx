"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/registry/new-york/ui/pagination";

interface PaginationProps {
  totalPages: number;
}

export function PaginationComponent({ totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get("pagination")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("pagination", newPage.toString());
    params.set("pageSize", pageSize.toString());

    router.push(`/list?${params.toString()}`);
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
        />
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
