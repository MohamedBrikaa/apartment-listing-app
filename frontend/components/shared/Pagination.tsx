interface PaginationProps {
    currentPage: number;
    totalPages: number;
    limit: number;
    resolvedParams: { [key: string]: string | string[] | undefined };
}

export default function Pagination({
    currentPage,
    totalPages,
    limit,
    resolvedParams,
}: PaginationProps) {
    return (
        <div className="flex justify-center mt-8 space-x-2">
            {currentPage > 1 && (
                <a
                    href={`?${new URLSearchParams({
                        ...resolvedParams,
                        page: String(currentPage - 1),
                        limit: String(limit),
                    })}`}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    Previous
                </a>
            )}

            {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                    <a
                        key={pageNum}
                        href={`?${new URLSearchParams({
                            ...resolvedParams,
                            page: String(pageNum),
                            limit: String(limit),
                        })}`}
                        className={`px-3 py-2 rounded ${pageNum === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {pageNum}
                    </a>
                );
            })}

            {currentPage < totalPages && (
                <a
                    href={`?${new URLSearchParams({
                        ...resolvedParams,
                        page: String(currentPage + 1),
                        limit: String(limit),
                    })}`}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    Next
                </a>
            )}
        </div>
    );
}