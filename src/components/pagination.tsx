// 'use client'

// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination"

// const handlePageChange = (page: number) => {
//     // setCurrentPage(page)
// }


// const Pagination = () => {
//     return (
//         <Pagination>
//             <PaginationContent>
//                 <PaginationItem>
//                     <PaginationPrevious href="#"
//                         onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
//                     />
//                 </PaginationItem>

//                 <PaginationItem>
//                     {
//                         [1, 2, 3, 4, 5, 6].map((page) => (
//                             <PaginationLink key={page} className="border" href="#" onClick={() => handlePageChange(page)}>
//                                 {page}
//                             </PaginationLink>
//                         ))
//                     }
//                 </PaginationItem>

//                 <PaginationItem>
//                     <PaginationNext href="#"
//                         onClick={() => handlePageChange(currentPage + 1)}
//                     />
//                 </PaginationItem>
//             </PaginationContent>
//         </Pagination>
//     )
// }