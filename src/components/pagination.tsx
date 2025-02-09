import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }: PaginationProps) => {

    const getPaginationRange = () => {
        let startPage = Math.max(1, currentPage - 3);
        let endPage = Math.min(totalPages, currentPage + 3);
        let pages = [];

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                )}

                {currentPage > 4 && (
                    <>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => handlePageChange(1)}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {getPaginationRange().map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? "border bg-gray-300 text-black" : "border"}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {currentPage < totalPages - 3 && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default PaginationComponent;
